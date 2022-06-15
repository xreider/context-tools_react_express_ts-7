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

export default function useAFloating({ floatingProps }: IFloatingProps) {
  const [floatingOpened, setFloatingOpened] = useState(false);
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({});
  const [floatingDisappearing, setFloatingDisappearing] = useState(false);
  const arrowRef = useRef<null | HTMLDivElement>(null);
  const { device } = useStoreDevice();
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
    x: menuX,
    y: menuY,
    refs,
  } = useFloating({
    // strategy: "fixed",
    open: floatingOpened,
    onOpenChange: setFloatingOpened,
    placement: floatingProps?.placement || "bottom",
    middleware: [
      offset(spaceToScreenEdges),
      shift({ padding: spaceToScreenEdges }),
      flip(),
      {
        name: "locationContainer",
        fn({ x: menuX, y: menuY, rects }) {
          if (!hasMenu) return { x: menuX, y: menuY };

          menuY = Math.max(menuY, heightANavbarTotal + spaceToScreenEdges);

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
              menuX = Math.min(
                Math.max(menuX, xContainer.clientLeft),
                xContainer.getBoundingClientRect().right -
                  refs.floating?.current?.getBoundingClientRect().width
              );
            }
          }

          return {
            x: menuX,
            y: menuY,
          };
        },
      },
      {
        name: "modalMode",
        fn({ x: menuX, y: menuY, rects }) {
          if (!hasMenu) return { x: menuX, y: menuY };

          // console.log("heightANavbarTotal", heightANavbarTotal);

          menuY = Math.max(menuY, heightANavbarTotal + spaceToScreenEdges);

          // console.log("heightANavbarTotal2", heightANavbarTotal);

          // const content = document.querySelector(
          //   `.${EClass.ContentWithSideMenu}`
          // );
          // const navbar = document.querySelector(`.${EClass.ANavbarWrapper}`);

          // if (!content || !navbar) {
          //   console.error("No content or ANavbarWrapper");
          //   console.error("content: ", content);
          //   console.error("ANavbarWrapper: ", navbar);
          //   return { x: menuX, y: menuY };
          // }

          // const contentRect = content.getBoundingClientRect();
          // const navbarRect = navbar.getBoundingClientRect();
          // // console.log("contentRect", contentRect);
          // // console.log("args", args);
          // // console.log("rects", rects);
          // const referenceRightEdge = rects.reference.x + rects.reference.width;
          // const contentRightEdge = contentRect.left + contentRect.width;
          // // console.log(
          // //   "referenceRightEdge, contentRightEdge",
          // //   referenceRightEdge,
          // //   contentRightEdge
          // // );

          // const _menuRightRadius =
          //   referenceRightEdge + spaceToScreenEdges + spaceNormal <=
          //   contentRightEdge;
          // // right edge
          // if (_menuRightRadius) {
          //   menuX = contentRightEdge - rects.floating.width;
          //   setMenuRightRadius(true);
          // } else {
          //   menuX = referenceRightEdge - rects.floating.width;
          //   setMenuRightRadius(false);
          // }

          return {
            x: menuX,
            y: menuY,
            // y: navbarRect.height,
          };
        },
      },
      // arrow({ element: arrowRef }),

      {
        name: "arrowInModalMode",
        fn({ x: menuX, y: menuY, ...args }) {
          if (!hasMenu) return { x: menuX, y: menuY };
          const { rects, elements, placement } = args;
          // console.log(args);

          const heightBetweenRefAndFloating =
            menuY - rects.reference.height + rects.reference.y;

          const left = rects.reference.x - menuX;

          // rects.floating.width + rects.floating.x - rects.reference.width;

          const topOrBottomArrowPosition =
            floatingProps?.arrowKind === "beam"
              ? placement === "top"
                ? {
                    bottom: -1 * heightBetweenRefAndFloating,
                  }
                : placement === "bottom"
                ? {
                    top: -1 * heightBetweenRefAndFloating,
                  }
                : {}
              : {};

          // console.log("rects", rects);

          setArrowStyle({
            ...arrowStyle,
            position: "absolute",
            ...topOrBottomArrowPosition,
            left: left,
            height: heightBetweenRefAndFloating,
            width: rects.reference.width,
          });

          // console.log(menuY);
          return {
            x: menuX,
            y: menuY,
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
    menuX,
    menuY,
    reference,
    setFloatingDisappearing,
    setFloatingOpened,
    strategy,
  };
}
