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
          radiusesBeamMode.floatingLeft || radiusesBeamMode.floatingLeft === 0
            ? `${radiusesBeamMode.floatingLeft}px`
            : "var(--borderRadiusBig)",
        // @ts-ignore
        "--AFloatingMenuRightRadius":
          radiusesBeamMode.floatingRight || radiusesBeamMode.floatingRight === 0
            ? `${radiusesBeamMode.floatingRight}px`
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
                radiusesBeamMode.beamLeft === 0 && st.arrowBeamEdgeFlat
              )}
            />
            <div
              className={cn(
                st.arrowBeam,
                st.arrowBeamRightEdge,
                radiusesBeamMode.beamRight === 0 && st.arrowBeamEdgeFlat
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
              size={radiusesBeamMode.beamLeft}
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
              size={radiusesBeamMode.beamRight}
              shadow={EACornerShadow.Neumorphic}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AFloatingMenu;
