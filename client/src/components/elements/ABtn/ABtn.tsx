import { ComponentPropsWithoutRef, FC, ReactElement } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

import { TFloatingReferenceProps } from "../AFloatingMenu/TypesAFloatingMenu";

export interface PABtnKid extends ComponentPropsWithoutRef<"div"> {
  text?: ReactElement | string;
}

export interface PABtn {
  active?: boolean;
  activeClassName?: string;
  behaviour?: "neumorphicHiddenOnCalm" | "simpleMask" | "none";
  stylesOnFloatingOpened?: {
    readonly [key: string]: string;
  };
  elements?: (PABtnKid | PAIcon)[];
  kind?: "glow" | "solid" | "outline" | "flex";
  propsContainer?: ComponentPropsWithoutRef<"div">;
  propsWrapper?: ComponentPropsWithoutRef<"button">;

  floatingMenu?: TFloatingReferenceProps;
}

const ABtn: FC<PABtn> = ({
  active,
  activeClassName,
  behaviour,
  elements,
  kind,
  propsContainer,
  propsWrapper,
  floatingMenu,

  // external styles
  stylesOnFloatingOpened,
}) => {
  const {
    arrowKind,
    reference,
    floatingDisappearing,
    floatingOpened,
    hasMenu,
    placement,
    setFloatingDisappearing,
    setFloatingOpened,
  } = floatingMenu || {};
  // console.log("arrowKind", arrowKind);
  // console.log("placement", placement);
  // console.log("floatingOpened", floatingOpened);

  return (
    <button
      {...propsWrapper}
      ref={reference}
      className={cn(
        st.ABtn_wrapper,
        behaviour && st[`behaviour_${behaviour}`],
        kind && st[`kind_${kind}`],
        !floatingDisappearing && floatingOpened && st.active,
        !floatingDisappearing && floatingOpened && st.floatingOpened,
        arrowKind && st[`arrowKind_${arrowKind}`],
        placement && st[`placement_${placement}`],

        active && st.active,
        active && activeClassName,
        propsWrapper?.className,

        // external styles
        !floatingDisappearing &&
          floatingOpened &&
          stylesOnFloatingOpened?.floatingOpened,
        floatingDisappearing && stylesOnFloatingOpened?.floatingDisappearing,
        arrowKind && stylesOnFloatingOpened?.[`arrowKind_${arrowKind}`],
        placement && stylesOnFloatingOpened?.[`placement_${placement}`]
      )}
      onClick={(event) => {
        // event.preventDefault();
        // event.stopPropagation();
        if (hasMenu) {
          if (!floatingDisappearing && !floatingOpened) {
            setFloatingOpened?.(true);
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
                <div className={cn(st.kid_wrapper, e.className)} key={i} {...e}>
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
  );
};

export default ABtn;
