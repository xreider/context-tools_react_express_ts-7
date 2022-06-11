import {
  ComponentPropsWithoutRef,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

import { ReactComponent as CornerOutside } from "public/img/elements/cornerOutside.svg";
import {
  arrow,
  flip,
  offset,
  Placement,
  shift,
  size,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { ECssSizeTitle } from "constants/common/cssTitles";
import { EClass } from "constants/common/EClass";

export interface PABtnKid extends ComponentPropsWithoutRef<"div"> {
  text?: ReactElement | string;
}

export interface PABtn {
  active?: boolean;
  activeClassName?: string;
  behaviour?: "neumorphicHiddenOnCalm" | "simpleMask" | "none";
  elements?: (PABtnKid | PAIcon)[];
  kind?: "glow" | "solid" | "outline" | "flex";
  menuProps?: {
    children?: ReactNode;
    mode?: "modal";
    placement?: Placement;
  };
  propsContainer?: ComponentPropsWithoutRef<"div">;
  propsWrapper?: ComponentPropsWithoutRef<"button">;
}

const ABtn: FC<PABtn> = ({
  active,
  activeClassName,
  behaviour,
  elements,
  kind,
  menuProps,
  propsContainer,
  propsWrapper,
}) => {
  const arrowRef = useRef(null);

  const { width } = useCustomWindowInnerSize();
  const [open, setOpen] = useState(false);

  const hasMenu = !!(
    typeof menuProps !== "undefined" && !!Object.keys(menuProps)?.length
  );

  const [spaceToScreenEdges] = useGetCssValueNum(
    [ECssSizeTitle.spaceToScreenEdges],
    { enabled: hasMenu }
  );
  // console.log("spaceToScreenEdges", spaceToScreenEdges);

  useEffect(() => {
    update();
  }, [width]);

  const {
    update,
    reference,
    floating,
    strategy,
    x,
    y,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    // strategy: "fixed",
    open,
    onOpenChange: setOpen,
    placement: menuProps?.placement || "bottom",
    middleware: [
      offset(spaceToScreenEdges),
      shift({ padding: spaceToScreenEdges }),
      {
        name: "modalMode",
        fn({ x, y, rects, ...args }) {
          if (!hasMenu || menuProps.mode !== "modal") return { x, y };
          const content = document.querySelector(
            `.${EClass.ContentWithSideMenu}`
          );
          const navbar = document.querySelector(`.${EClass.ANavbarWrapper}`);

          if (!content || !navbar) {
            console.error("No content or ANavbarWrapper");
            console.error("content: ", content);
            console.error("ANavbarWrapper: ", navbar);
            return { x, y };
          }

          const contentRect = content.getBoundingClientRect();
          const navbarRect = navbar.getBoundingClientRect();
          console.log("contentRect", contentRect);
          console.log("args", args);
          console.log("rects", rects);
          return {
            x: contentRect.left + contentRect.width - rects.floating.width,
            y: navbarRect.height + spaceToScreenEdges,
          };
        },
      },
      arrow({ element: arrowRef }),
    ],
  });

  return (
    <>
      <button
        {...propsWrapper}
        ref={reference}
        className={cn(
          st.ABtn_wrapper,
          behaviour && st[`behaviour_${behaviour}`],
          kind && st[`kind_${kind}`],
          open && st.hovered,
          active && st.active,
          active && activeClassName,
          propsWrapper?.className
        )}
        onClick={(event) => {
          if (hasMenu) {
            setOpen((state) => !state);
          }
        }}
      >
        <div
          {...propsContainer}
          className={cn(st.ABtn_container, propsContainer?.className)}
        >
          {elements &&
            elements.map((e, i) => {
              // icon
              if ("icon" in e) {
                if (!e.icon) return null;
                return (
                  <AIcon
                    className={cn(st.icon_wrapper, e.className)}
                    key={i}
                    {...e}
                  />
                );
              }
              if ("text" in e) {
                if (!e.text) return null;
                return (
                  <div
                    className={cn(st.kid_wrapper, e.className)}
                    key={i}
                    {...e}
                  >
                    {e.text}
                  </div>
                );
              }
              return (
                <AIcon
                  icon={EAIcons.error}
                  className={cn(st.icon_wrapper, e.className)}
                  key={i}
                />
              );
            })}
        </div>
      </button>
      {hasMenu && open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className={st.menu}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          My tooltip
          <div
            ref={arrowRef}
            style={{
              top: arrowY ?? 0,
              left: arrowX ?? 0,
            }}
            className={st.arrow}
          />
        </div>
      )}
    </>
  );
};

export default ABtn;
