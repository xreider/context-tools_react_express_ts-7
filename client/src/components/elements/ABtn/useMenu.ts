import {
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { ECssSizeTitle } from "constants/common/cssTitles";
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
import { PABtn } from "./ABtn";

interface PUseMenu {
  menuProps: PABtn["menuProps"];
  // arrowRef: MutableRefObject<null | HTMLDivElement>;
}

export default function useMenu({ menuProps }: PUseMenu) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({});
  const [menuRightRadius, setMenuRightRadius] = useState(true);
  const arrowRef = useRef<null | HTMLDivElement>(null);
  const hasMenu = useMemo(
    () =>
      !!(typeof menuProps !== "undefined" && !!Object.keys(menuProps)?.length),
    [menuProps]
  );
  const { width } = useCustomWindowInnerSize({ enabled: hasMenu });

  const [spaceToScreenEdges, spaceNormal] = useGetCssValueNum(
    [ECssSizeTitle.spaceToScreenEdges, ECssSizeTitle.spaceNormal],
    { enabled: hasMenu }
  );
  // console.log("spaceToScreenEdges", spaceToScreenEdges);

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
    open: menuOpened,
    onOpenChange: setMenuOpened,
    placement: menuProps?.placement || "bottom",
    middleware: [
      offset(spaceToScreenEdges),
      shift({ padding: spaceToScreenEdges }),
      {
        name: "modalMode",
        fn({ x: menuX, y: menuY, rects }) {
          if (!hasMenu) return { x: menuX, y: menuY };

          const content = document.querySelector(
            `.${EClass.ContentWithSideMenu}`
          );
          const navbar = document.querySelector(`.${EClass.ANavbarWrapper}`);

          if (!content || !navbar) {
            console.error("No content or ANavbarWrapper");
            console.error("content: ", content);
            console.error("ANavbarWrapper: ", navbar);
            return { x: menuX, y: menuY };
          }

          const contentRect = content.getBoundingClientRect();
          const navbarRect = navbar.getBoundingClientRect();
          // console.log("contentRect", contentRect);
          // console.log("args", args);
          // console.log("rects", rects);
          const referenceRightEdge = rects.reference.x + rects.reference.width;
          const contentRightEdge = contentRect.left + contentRect.width;
          // console.log(
          //   "referenceRightEdge, contentRightEdge",
          //   referenceRightEdge,
          //   contentRightEdge
          // );

          const _menuRightRadius =
            referenceRightEdge + spaceToScreenEdges + spaceNormal <=
            contentRightEdge;
          // right edge
          if (_menuRightRadius) {
            menuX = contentRightEdge - rects.floating.width;
            setMenuRightRadius(true);
          } else {
            menuX = referenceRightEdge - rects.floating.width;
            setMenuRightRadius(false);
          }

          return {
            x: menuX,
            y: navbarRect.height + spaceToScreenEdges,
            // y: navbarRect.height,
          };
        },
      },
      // arrow({ element: arrowRef }),

      {
        name: "arrowInModalMode",
        fn({ x: menuX, y: menuY, ...args }) {
          if (!hasMenu) return { x: menuX, y: menuY };
          const { rects, elements } = args;
          console.log(args);

          console.log(
            "elements.reference.getBoundingClientRect()",
            elements.reference.getBoundingClientRect()
          );

          const heightBetweenRefAndFloating =
            menuY - rects.reference.height + rects.reference.y;
          console.log(
            "heightBetweenRefAndFloating",
            heightBetweenRefAndFloating
          );

          const left = rects.reference.x;
          console.log(rects.reference.x, rects.floating.width, menuX);

          setArrowStyle({
            position: "fixed",
            top: rects.reference.y + rects.reference.height,
            left: left,
            height: heightBetweenRefAndFloating,
            width: rects.reference.width,
          });

          return {
            x: menuX,
            y: menuY,
          };
        },
      },
    ],
  });

  useEffect(() => {
    if (!hasMenu) return;
    setTimeout(() => {
      update();
    }, 0);
  }, [width, hasMenu, update]);

  const arrowCallback = useCallback(
    (node: any) => {
      if (!hasMenu) return;
      arrowRef.current = node;
      update();
    },
    [update, hasMenu]
  );

  useOutsideClick(
    [refs.floating, refs.reference],
    () => {
      setMenuOpened(false);
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
    floating,
    hasMenu,
    menuOpened,
    menuRightRadius,
    menuX,
    menuY,
    reference,
    setMenuOpened,
    strategy,
  };
}
