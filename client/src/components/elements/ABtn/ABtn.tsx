import { ComponentPropsWithoutRef, FC, ReactElement } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AIcon, { EAIcons, PAIcon } from "../AIcon/AIcon";

import { ReactComponent as CornerOutside } from "public/img/elements/cornerOutside.svg";

export interface PABtnKid extends ComponentPropsWithoutRef<"div"> {
  text?: ReactElement | string;
}

export interface PABtn {
  activeNav?: boolean;
  behaviour?: "neumorphicHiddenOnCalm" | "simpleMask" | "none";
  elements?: (PABtnKid | PAIcon)[];
  kind?: "glow" | "solid" | "outline" | "flex";
  propsWrapper?: ComponentPropsWithoutRef<"button">;
  propsContainer?: ComponentPropsWithoutRef<"div">;
}

const ABtn: FC<PABtn> = ({
  activeNav,
  behaviour,
  elements,
  kind,
  propsWrapper,
  propsContainer,
}) => {
  return (
    <button
      {...propsWrapper}
      className={cn(
        st.ABtn_wrapper,
        activeNav && st.activeNav,
        behaviour && st[`behaviour_${behaviour}`],
        propsWrapper?.className,
        kind && st[`kind_${kind}`]
      )}
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
      {activeNav && (
        <div className={cn(st.activeNavElements)}>
          <div className={cn(st.activeNavCorners, st.activeNavLeftCorner)} />
          <div className={cn(st.activeNavCorners, st.activeNavRightCorner)} />
        </div>
      )}
      {/* {activeNav && (
        <div className={cn(st.activeNav)}>
          <CornerOutside
            className={cn(st.activeNavCorners, st.activeNavLeftCorner)}
          />
          <CornerOutside
            className={cn(st.activeNavCorners, st.activeNavRightCorner)}
          />
        </div>
      )} */}
    </button>
  );
};

export default ABtn;
