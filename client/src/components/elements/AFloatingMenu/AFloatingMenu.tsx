import { FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import { PAFloatingMenu } from "./TypesAFloatingMenu";

const AFloatingMenu: FC<PAFloatingMenu> = ({
  arrowCallback,
  arrowStyle,
  arrowX,
  arrowY,
  floating,
  menuRightRadius,
  menuX,
  menuY,
  strategy,
  menuProps,
}) => {
  return (
    <div
      ref={floating}
      style={{
        position: strategy,
        top: menuY ?? 0,
        left: menuX ?? 0,
      }}
      className={cn(st.menu, !menuRightRadius && st.menuRightRadiusDisabled)}
      // onClick={(event) => {
      //   event.stopPropagation();
      //   event.preventDefault();
      // }}
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
  );
};

export default AFloatingMenu;
