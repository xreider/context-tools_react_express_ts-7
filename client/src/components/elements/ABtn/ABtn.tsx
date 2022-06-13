import { ComponentPropsWithoutRef, FC, ReactElement, ReactNode } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

// import { ReactComponent as CornerOutside } from "public/img/elements/cornerOutside.svg";

import useMenu from "../AFloatingMenu/useMenu";
import AFloatingMenu from "../AFloatingMenu/AFloatingMenu";
import { IMenuProps } from "../AFloatingMenu/TypesAFloatingMenu";

export interface PABtnKid extends ComponentPropsWithoutRef<"div"> {
  text?: ReactElement | string;
}

export interface PABtn extends IMenuProps {
  active?: boolean;
  activeClassName?: string;
  behaviour?: "neumorphicHiddenOnCalm" | "simpleMask" | "none";
  elements?: (PABtnKid | PAIcon)[];
  kind?: "glow" | "solid" | "outline" | "flex";
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
    hasMenu,
    menuOpened,
    reference,
    setMenuOpened,
    ...floatingProps
    // arrowCallback,
    // arrowStyle,
    // arrowX,
    // arrowY,
    // floating,
    // menuRightRadius,
    // menuX,
    // menuY,
    // strategy,
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
        <AFloatingMenu {...floatingProps} menuProps={menuProps} />
      )}
    </>
  );
};

export default ABtn;
