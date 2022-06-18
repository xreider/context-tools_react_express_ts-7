import {
  autoUpdate,
  flip,
  MiddlewareArguments,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { ECssSizeTitle, ECssSpeedTitle } from "constants/common/cssTitles";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { useOutsideClick } from "hooks/common/useOutsideClick";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { applyFloatingHeight } from "./middlewares/applyFloatingHeight";
import { setArrowBeamStyle } from "./middlewares/setArrowBeamStyle";
import { setBorderBeamAndFloatingRadiuses } from "./middlewares/setBorderBeamAndFloatingRadiuses";
import { IUseFloatingProps } from "./TypesAFloatingMenu";

export interface PRadiusesBeamMode {
  floatingLeft?: number;
  floatingRight?: number;
  beamLeft: number;
  beamRight: number;
}

export default function useAFloating(floatingProps: IUseFloatingProps) {
  const [floatingOpened, setFloatingOpened] = useState(false);
  const [arrowStyle, setArrowStyle] = useState<CSSProperties>({});
  // const [floatingStyle, setFloatingStyle] = useState<CSSProperties>({});
  const [floatingDisappearing, setFloatingDisappearing] = useState(false);
  const [radiusesBeamMode, setRadiusesBeamMode] = useState<PRadiusesBeamMode>({
    floatingLeft: 0,
    floatingRight: 0,
    beamLeft: 0,
    beamRight: 0,
  });

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

  const [
    spaceSmall,
    spaceNormal,
    spaceToScreenEdges,
    heightANavbarTotal,
    borderRadiusMedium,

    speedQuick,
  ] = useGetCssValueNum(
    [
      ECssSizeTitle.SpaceSmall,
      ECssSizeTitle.SpaceNormal,
      ECssSizeTitle.SpaceToScreenEdges,
      ECssSizeTitle.HeightANavbarTotal,
      ECssSizeTitle.BorderRadiusMedium,

      ECssSpeedTitle.Quick,
    ],
    { enabled: hasMenu }
  );

  console.log("spaceToScreenEdges", spaceToScreenEdges);

  // console.log("heightANavbarTotal", heightANavbarTotal);

  const {
    floating,
    // middlewareData,
    reference,
    strategy,
    update,
    x: floatingX,
    y: floatingY,
    refs,
    placement,
  } = useFloating({
    strategy: "fixed",
    open: floatingOpened,
    onOpenChange: setFloatingOpened,
    placement: floatingProps?.placement || "bottom",
    middleware: [
      offset(
        Math.max(spaceSmall, floatingProps?.gapHeight ?? spaceToScreenEdges)
      ),
      shift({ padding: spaceToScreenEdges }),

      flip({ padding: 10 }),

      {
        name: "locationContainer",
        fn({ x: floatingX, y: floatingY, rects, placement, elements }) {
          if (!hasMenu) return { x: floatingX, y: floatingY };

          if (floatingProps?.location) {
            floatingProps.locationX = floatingProps?.location;
            floatingProps.locationY = floatingProps?.location;
          }

          if (floatingProps?.locationX) {
            const xContainer = document.querySelector(
              `.${floatingProps.locationX}`
            ) as HTMLElement;
            // console.log(xContainer);
            if (
              xContainer &&
              typeof refs.floating?.current?.getBoundingClientRect !==
                "undefined"
            ) {
              floatingX = Math.min(
                Math.max(floatingX, xContainer.offsetLeft),
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

      size({
        apply(args) {
          // Do things with the data, e.g.
          applyFloatingHeight({ args, heightANavbarTotal, spaceToScreenEdges });
        },
      }),
      {
        name: "setBorderBeamAndFloatingRadiuses",
        fn(args) {
          setBorderBeamAndFloatingRadiuses({
            args,
            borderRadiusReference: borderRadiusMedium,
            borderRadiusFloating: spaceToScreenEdges,
            enable: hasMenu && floatingProps?.arrowKind === "beam",
            setRadiusesBeamMode,
          });
          return args;
        },
      },
      {
        name: "setArrowBeamStyle",
        fn(args) {
          setArrowBeamStyle({
            args,
            setArrowStyle,
            enable: hasMenu && floatingProps?.arrowKind === "beam",
          });
          return args;
        },
      },
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!hasMenu) return;
    if (floatingOpened && floatingDisappearing) {
      setTimeout(() => {
        setFloatingDisappearing(false);
        setFloatingOpened(false);
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

  useEffect(() => {
    if (!hasMenu) return;
    setTimeout(() => {
      update();
    }, speedQuick);
  }, [
    width,
    hasMenu,
    update,
    // spaceToScreenEdges,
    // spaceNormal,
    // heightANavbarTotal,
    // speedQuick,
  ]);

  return {
    arrowCallback,
    arrowStyle,
    // arrowX,
    // arrowY,
    floatingDisappearing,
    floating,
    hasMenu,
    floatingOpened,
    // menuRightRadius,
    floatingX,
    floatingY,
    placement,
    radiusesBeamMode,
    reference,
    setFloatingDisappearing,
    setFloatingOpened,
    strategy,
  };
}

// useEffect(() => {
//   if (!hasMenu) return;
//   update();
// }, [
//   width,
//   hasMenu,
//   update,
//   spaceToScreenEdges,
//   spaceNormal,
//   heightANavbarTotal,
//   speedQuick,
// ]);

// size({
//   apply({ availableWidth, elements }) {
//     // Do things with the data, e.g.
//     Object.assign(elements.floating.style, {
//       maxWidth: `${availableWidth}px`,
//     });
//   },
// }),

// {
//   name: "gapHeight",
//   fn({ x: floatingX, y: floatingY, rects, placement, elements }) {
//     if (!hasMenu) return { x: floatingX, y: floatingY };

//     if (floatingProps?.gapHeight) {
//       floatingProps.locationX = floatingProps?.location;
//       floatingProps.locationY = floatingProps?.location;
//     }

//     if (floatingProps?.locationX) {
//       const xContainer = document.querySelector(
//         `.${floatingProps.locationX}`
//       ) as HTMLElement;
//       if (
//         xContainer &&
//         typeof refs.floating?.current?.getBoundingClientRect !==
//           "undefined"
//       ) {
//         floatingX = Math.min(
//           Math.max(floatingX, xContainer.offsetLeft),
//           xContainer.getBoundingClientRect().right -
//             refs.floating?.current?.getBoundingClientRect().width
//         );
//       }
//     }

//     return {
//       x: floatingX,
//       y: floatingY,
//     };
//   },
// },

// let bottomOffset = 0;
// if (placement === "top") {
//   console.log(floatingY);
//   bottomOffset = elements.floating.getBoundingClientRect().bottom;
// }

// floatingY =
//   placement === "bottom"
//     ? Math.max(floatingY, heightANavbarTotal + spaceToScreenEdges)
//     : placement === "top"
//     ? floatingY
//     : floatingY;

// Math.max(
//     spaceToScreenEdges,
//     window.innerHeight -
//       rects.floating.height -
//       heightANavbarTotal -
//       spaceToScreenEdges
//   )
// : floatingY;

// const maxHeight =
//   floatingY > 0
//     ? window.innerHeight -
//       spaceToScreenEdges * 2 -
//       heightANavbarTotal -
//       floatingY
//     : "50vh";

// console.log(floatingY);

// setFloatingStyle({
//   maxHeight,
//   //  -
//   // spaceToScreenEdges * 2 -
//   // heightANavbarTotal,
// });

// console.log(Math.max(xContainer.offsetLeft));
// console.log(
//   xContainer.getBoundingClientRect().right -
//     refs.floating?.current?.getBoundingClientRect().width
// );
