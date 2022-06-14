import { ComponentPropsWithoutRef, FC, ReactElement, ReactNode } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

// import { ReactComponent as CornerOutside } from "public/img/elements/cornerOutside.svg";

import useAFloating from "../AFloatingMenu/useAFloating";
import AFloatingMenu from "../AFloatingMenu/AFloatingMenu";
import { IFloatingProps } from "../AFloatingMenu/TypesAFloatingMenu";

export interface PABtnKid extends ComponentPropsWithoutRef<"div"> {
  text?: ReactElement | string;
}

export interface PABtn extends IFloatingProps {
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
  floatingProps,
  propsContainer,
  propsWrapper,
}) => {
  const {
    hasMenu,
    floatingOpened,
    reference,
    setFloatingOpened,
    ...otherFloatingProps
    // arrowCallback,
    // arrowStyle,
    // arrowX,
    // arrowY,
    // floating,
    // menuRightRadius,
    // menuX,
    // menuY,
    // strategy,
  } = useAFloating({ floatingProps });

  const { floatingDisappearing, setFloatingDisappearing } = otherFloatingProps; // sharable with floating
  // console.log(floatingDisappearing);

  return (
    <>
      <button
        {...propsWrapper}
        ref={reference}
        className={cn(
          st.ABtn_wrapper,
          behaviour && st[`behaviour_${behaviour}`],
          kind && st[`kind_${kind}`],
          !floatingDisappearing && floatingOpened && st.hovered,
          active && st.active,
          active && activeClassName,
          propsWrapper?.className
        )}
        onClick={(event) => {
          if (hasMenu) {
            if (!floatingDisappearing && !floatingOpened) {
              setFloatingOpened(true);
            } else {
              setFloatingDisappearing?.((state) => !state);
            }
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
      {hasMenu && floatingOpened && (
        <AFloatingMenu {...otherFloatingProps} floatingProps={floatingProps} />
      )}
    </>
  );
};

export default ABtn;
