import { FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import { TFloatingElementProps } from "./TypesAFloatingMenu";
import ACorner, {
  EACornerDirection,
  EACornerShadow,
  EACornerSide,
} from "../ACorner/ACorner";

const AFloatingMenu: FC<TFloatingElementProps> = ({
  // menuRightRadius,
  arrowCallback,
  arrowKind,
  arrowStyle,
  classNameWrapper,
  // floatingStyle,
  floatingDisappearing,
  floating,
  floatingX,
  floatingY,
  radiusesBeamMode,
  setFloatingDisappearing,
  strategy,
  placement,
  content,
}) => {
  console.log(radiusesBeamMode.beamRightDistanceX);

  return (
    <div
      ref={floating}
      style={{
        position: strategy,
        top: floatingY ?? 0,
        left: floatingX ?? 0,
        // ...floatingStyle,
        // @ts-ignore
        "--AFloatingMenuLeftRadius":
          radiusesBeamMode.floatingLeftRadius ||
          radiusesBeamMode.floatingLeftRadius === 0
            ? `${radiusesBeamMode.floatingLeftRadius}px`
            : "var(--borderRadiusBig)",
        // @ts-ignore
        "--AFloatingMenuRightRadius":
          radiusesBeamMode.floatingRightRadius ||
          radiusesBeamMode.floatingRightRadius === 0
            ? `${radiusesBeamMode.floatingRightRadius}px`
            : "var(--borderRadiusBig)",
      }}
      className={cn(
        st.menu,
        st[`placement_${placement}`],
        floatingDisappearing && st.floatingDisappearing,
        classNameWrapper
      )}
      // onClick={(event) => {
      //   event.stopPropagation();
      //   event.preventDefault();
      // }}
    >
      {content}
      <div
        ref={arrowCallback}
        style={{
          // top: arrowY ?? 0,
          // left: arrowX ?? 0,
          ...arrowStyle,
        }}
        className={st.arrow}
      >
        {arrowKind === "beam" && (
          <>
            {/* <div className={st.arrowBeam}> */}
            <div
              className={cn(
                st.arrowBeam,
                st.arrowBeamLeftEdge,
                // radiusesBeamMode.beamLeftDistanceX === 0 &&
                //   st.beamLeftDistanceXFlat,
                radiusesBeamMode.beamLeftDistanceX === 0 && st.arrowBeamEdgeFlat
              )}
            />
            <div
              className={cn(
                st.arrowBeam,
                st.arrowBeamRightEdge,
                // radiusesBeamMode.beamRightDistanceX === 0 &&
                //   st.beamRightDistanceXFlat,
                radiusesBeamMode.beamRightDistanceX === 0 &&
                  st.arrowBeamEdgeFlat
              )}
            />
            {/* </div> */}

            <ACorner
              direction={
                placement === "bottom"
                  ? EACornerDirection.TopLeft
                  : EACornerDirection.BottomLeft
              }
              positionMinusOfThisWidth
              propsWrapper={{
                className: cn(st.arrowCorner, st.arrowLeftCorner),
              }}
              placement={placement}
              side={EACornerSide.Inside}
              size={[
                radiusesBeamMode.beamLeftDistanceX,
                radiusesBeamMode.beamLeftDistanceY,
              ]}
              shadow={EACornerShadow.Neumorphic}
            />
            <ACorner
              direction={
                placement === "bottom"
                  ? EACornerDirection.TopRight
                  : EACornerDirection.BottomRight
              }
              placement={placement}
              positionMinusOfThisWidth
              propsWrapper={{
                className: cn(st.arrowCorner, st.arrowRightCorner),
              }}
              side={EACornerSide.Inside}
              size={[
                radiusesBeamMode.beamRightDistanceX,
                radiusesBeamMode.beamRightDistanceY,
              ]}
              shadow={EACornerShadow.Neumorphic}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AFloatingMenu;
