import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { ECssSizeTitle, ECssSpeedTitle } from "constants/common/cssTitles";
import { EClass } from "constants/common/EClass";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { useOutsideClick } from "hooks/common/useOutsideClick";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useStoreDevice } from "stores/useStoreDevice";
import { IFloatingProps } from "./TypesAFloatingMenu";

export default function useAFloating(floatingProps: IFloatingProps) {
  const [floatingOpened, setFloatingOpened] = useState(false);
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({});
  const [floatingDisappearing, setFloatingDisappearing] = useState(false);
  const arrowRef = useRef<null | HTMLDivElement>(null);

  const hasMenu = useMemo(
    () =>
      !!(
        typeof floatingProps !== "undefined" &&
        !!Object.keys(floatingProps)?.length
      ),
    [floatingProps]
  );
  const { width } = useCustomWindowInnerSize({ enabled: hasMenu });

  const [spaceToScreenEdges, spaceNormal, heightANavbarTotal, speedNormal] =
    useGetCssValueNum(
      [
        ECssSizeTitle.SpaceToScreenEdges,
        ECssSizeTitle.SpaceNormal,
        ECssSizeTitle.HeightANavbarTotal,
        ECssSpeedTitle.Quick,
      ],
      { enabled: hasMenu }
    );

  // console.log("spaceToScreenEdges", spaceToScreenEdges);

  // console.log("heightANavbarTotal", heightANavbarTotal);

  const {
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    reference,
    strategy,
    update,
    x: floatingX,
    y: floatingY,
    refs,
  } = useFloating({
    strategy: "fixed",
    open: floatingOpened,
    onOpenChange: setFloatingOpened,
    placement: floatingProps?.placement || "bottom",
    middleware: [
      offset(spaceToScreenEdges),
      shift({ padding: spaceToScreenEdges }),
      flip(),
      {
        name: "locationContainer",
        fn({ x: floatingX, y: floatingY, rects, placement, elements }) {
          if (!hasMenu) return { x: floatingX, y: floatingY };

          // let bottomOffset = 0;
          // if (placement === "top") {
          //   console.log(floatingY);
          //   bottomOffset = elements.floating.getBoundingClientRect().bottom;
          // }

          floatingY =
            placement === "bottom"
              ? Math.max(floatingY, heightANavbarTotal + spaceToScreenEdges)
              : placement === "top"
              ? Math.max(
                  spaceToScreenEdges,
                  window.innerHeight -
                    rects.floating.height -
                    heightANavbarTotal -
                    spaceToScreenEdges
                )
              : floatingY;

          if (floatingProps?.location) {
            floatingProps.locationX = floatingProps?.location;
            floatingProps.locationY = floatingProps?.location;
          }

          if (floatingProps?.locationX) {
            const xContainer = document.querySelector(
              `.${floatingProps.locationX}`
            );
            if (
              xContainer &&
              typeof refs.floating?.current?.getBoundingClientRect !==
                "undefined"
            ) {
              floatingX = Math.min(
                Math.max(floatingX, xContainer.clientLeft),
                xContainer.getBoundingClientRect().right -
                  refs.floating?.current?.getBoundingClientRect().width
              );
            }
          }

          return {
            x: floatingX,
            y: floatingY,
          };
        },
      },

      {
        name: "arrowInModalMode",
        fn({ x: floatingX, y: floatingY, ...args }) {
          if (!hasMenu) return { x: floatingX, y: floatingY };
          const { rects, elements, placement } = args;
          // console.log(args);

          if (floatingProps?.arrowKind === "beam") {
            if (placement === "bottom") {
              const heightBetweenRefAndFloating =
                floatingY - rects.reference.height + rects.reference.y;
              setArrowStyle({
                ...arrowStyle,
                position: "absolute",
                top: -1 * heightBetweenRefAndFloating,
                left: rects.reference.x - floatingX,
                height: heightBetweenRefAndFloating,
                width: rects.reference.width,
              });
            } else if (placement === "top") {
              const heightBetweenRefAndFloating =
                rects.reference.y - floatingY - rects.floating.height;

              console.log(heightBetweenRefAndFloating);

              setArrowStyle({
                ...arrowStyle,
                top: "unset",
                position: "absolute",
                bottom: -1 * heightBetweenRefAndFloating,
                left: rects.reference.x - floatingX,
                height: heightBetweenRefAndFloating,
                width: rects.reference.width,
              });
            }

            // console.log(floatingY);
          }

          return {
            x: floatingX,
            y: floatingY,
          };
        },
      },
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!hasMenu) return;
    setTimeout(() => {
      flushSync(() => update());
    }, 0);
  }, [
    width,
    hasMenu,
    update,
    spaceToScreenEdges,
    spaceNormal,
    heightANavbarTotal,
    speedNormal,
  ]);

  useEffect(() => {
    if (!hasMenu) return;
    if (floatingOpened && floatingDisappearing) {
      setTimeout(() => {
        setFloatingOpened(false);
        setFloatingDisappearing(false);
      }, speedNormal);
    }
  }, [
    floatingDisappearing,
    floatingOpened,
    hasMenu,
    setFloatingDisappearing,
    setFloatingOpened,
    speedNormal,
  ]);

  const arrowCallback = useCallback(
    (node: any) => {
      if (!hasMenu) return;
      arrowRef.current = node;
      update();
    },
    [arrowRef, update, hasMenu]
  );

  useOutsideClick(
    [refs.floating, refs.reference],
    () => {
      setFloatingDisappearing(true);
    },
    hasMenu
  );

  // useEffect(() => {
  //   if (!hasMenu) return;
  //   update();
  // }, [arrowStyle]);

  return {
    arrowCallback,
    arrowStyle,
    arrowX,
    arrowY,
    floatingDisappearing,
    floating,
    hasMenu,
    floatingOpened,
    // menuRightRadius,
    floatingX,
    floatingY,
    reference,
    setFloatingDisappearing,
    setFloatingOpened,
    strategy,
  };
}
