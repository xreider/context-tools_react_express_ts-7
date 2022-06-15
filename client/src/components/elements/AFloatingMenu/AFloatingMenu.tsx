import { FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import { PAFloatingMenu } from "./TypesAFloatingMenu";

const AFloatingMenu: FC<PAFloatingMenu> = ({
  // menuRightRadius,
  arrowCallback,
  arrowStyle,
  arrowX,
  arrowY,
  floatingDisappearing,
  floating,
  floatingX,
  floatingY,
  setFloatingDisappearing,
  strategy,

  content,
}) => {
  return (
    <div
      ref={floating}
      style={{
        position: strategy,
        top: floatingY ?? 0,
        left: floatingX ?? 0,
      }}
      className={cn(st.menu, floatingDisappearing && st.floatingDisappearing)}
      // onClick={(event) => {
      //   event.stopPropagation();
      //   event.preventDefault();
      // }}
    >
      {content}
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
  );
};

export default AFloatingMenu;
