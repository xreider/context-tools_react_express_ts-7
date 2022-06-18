import { ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import { ReactComponent as CornerInside } from "./assets/cornerInside.svg";
import { ReactComponent as CornerOutside } from "./assets/cornerOutside.svg";
import { EFieldColorCN } from "constants/common/colors";
import { Placement } from "@floating-ui/react-dom-interactions";

export enum EACornerSide {
  Inside = "inside",
  Outside = "outside",
}

export enum EACornerDirection {
  TopLeft = "TopLeft",
  TopRight = "TopRight",
  BottomLeft = "BottomLeft",
  BottomRight = "BottomRight",
}

export enum EACornerShadow {
  Neumorphic = "Neumorphic",
  Line = "Line",
  None = "None",
}

export interface PACorner {
  propsWrapper?: ComponentPropsWithoutRef<"div">;
  side: EACornerSide;
  size: number | string;
  direction: EACornerDirection;
  placement?: Placement;
  shadow: EACornerShadow;
  fieldColorCN?: EFieldColorCN;
  positionMinusOfThisWidth?: boolean;
}

const ACorner: FC<PACorner> = ({
  fieldColorCN,
  propsWrapper,
  side,
  size,
  direction,
  shadow,
  placement,
  positionMinusOfThisWidth,
}) => {
  return (
    <div
      {...propsWrapper}
      className={cn(
        st.ACorner_wrapper,
        st[`direction${direction}`],
        st[`shadow${shadow}`],
        positionMinusOfThisWidth && st.positionMinusOfThisWidth,
        fieldColorCN,
        propsWrapper?.className,
        placement && st[`placement_${placement}`]
      )}
      style={{
        // @ts-ignore
        "--ACornerSize": typeof size === "number" ? `${size}px` : size,
      }}
    >
      <div className={cn(st.ACorner_container)} />
      {side === EACornerSide.Inside && <CornerInside />}
      {side === EACornerSide.Outside && <CornerOutside />}
    </div>
  );
};

export default ACorner;
