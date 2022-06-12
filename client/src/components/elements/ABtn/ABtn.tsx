import { ComponentPropsWithoutRef, FC, ReactElement, ReactNode } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

// import { ReactComponent as CornerOutside } from "public/img/elements/cornerOutside.svg";
import { Placement } from "@floating-ui/react-dom-interactions";

import useMenu from "./useMenu";

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
  const {
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
  } = useMenu({ menuProps });

  return (
    <>
      <button
        {...propsWrapper}
        ref={reference}
        className={cn(
          st.ABtn_wrapper,
          behaviour && st[`behaviour_${behaviour}`],
          kind && st[`kind_${kind}`],
          menuOpened && st.hovered,
          menuOpened && st.menuOpened,
          active && st.active,
          active && activeClassName,
          propsWrapper?.className
        )}
        onClick={(event) => {
          if (hasMenu) {
            setMenuOpened?.((state) => !state);
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
      {hasMenu && menuOpened && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: menuY ?? 0,
            left: menuX ?? 0,
          }}
          className={cn(
            st.menu,
            !menuRightRadius && st.menuRightRadiusDisabled
          )}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {menuProps?.children}
          <div
            ref={arrowCallback}
            style={{
              top: arrowY ?? 0,
              left: arrowX ?? 0,
              ...arrowStyle,
            }}
            className={st.arrow}
          >
            <div className={st.arrowBeam}>
              <div className={st.arrowBeamLeftEdge} />
              <div className={st.arrowBeamRightEdge} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ABtn;
