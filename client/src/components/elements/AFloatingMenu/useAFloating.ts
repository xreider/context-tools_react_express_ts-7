import {
  autoUpdate,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { ECssSizeTitle, ECssSpeedTitle } from "constants/common/cssTitles";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { useOutsideClick } from "hooks/common/useOutsideClick";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useStoreDevice } from "stores/useStoreDevice";
import { IFloatingProps } from "./TypesAFloatingMenu";

interface PUseMenu extends IFloatingProps {}

export default function useAFloating({ floatingProps }: PUseMenu) {
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

  const [spaceToScreenEdges, spaceNormal, heightANavbarTotal, speedQuick] =
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
          // const { rects, elements } = args;
          // console.log(args);

          // console.log(
          //   "elements.reference.getBoundingClientRect()",
          //   elements.reference.getBoundingClientRect()
          // );

          // const heightBetweenRefAndFloating =
          //   menuY - rects.reference.height + rects.reference.y;
          // console.log(
          //   "heightBetweenRefAndFloating",
          //   heightBetweenRefAndFloating
          // );

          // const left = rects.reference.x;
          // console.log(rects.reference.x, rects.floating.width, menuX);

          // setArrowStyle({
          //   position: "fixed",
          //   top: rects.reference.y + rects.reference.height,
          //   left: left,
          //   height: heightBetweenRefAndFloating,
          //   width: rects.reference.width,
          // });

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
    speedQuick,
  ]);

  useEffect(() => {
    if (!hasMenu) return;
    if (floatingOpened && floatingDisappearing) {
      setTimeout(() => {
        setFloatingOpened(false);
        setFloatingDisappearing(false);
      }, speedQuick);
    }
  }, [
    floatingDisappearing,
    floatingOpened,
    hasMenu,
    setFloatingDisappearing,
    setFloatingOpened,
    speedQuick,
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
