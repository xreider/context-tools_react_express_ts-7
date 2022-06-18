import React, { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
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
  size: number | string | [number, number] | [string, string];
  direction: EACornerDirection;
  placement?: Placement;
  shadow: EACornerShadow;
  fieldColorCN?: EFieldColorCN;
  positionMinusOfThisWidth?: boolean;
}

export interface PACornerCustomCSSProperties extends CSSProperties {
  "--distanceX"?: number | string;
  "--distanceY"?: number | string;
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
  let style: PACornerCustomCSSProperties = React.useMemo(() => {
    if (Array.isArray(size) && typeof size[0] === "number") {
      return {
        "--distanceX": `${size[0]}px`,
        "--distanceY": `${size[1]}px`,
      };
    } else if (Array.isArray(size) && typeof size[0] === "string") {
      return {
        "--distanceX": size[0],
        "--distanceY": size[1],
      };
    } else if (typeof size === "number") {
      return {
        "--distanceX": `${size}px`,
        "--distanceY": `${size}px`,
      };
    } else if (typeof size === "string") {
      return {
        "--distanceX": size,
        "--distanceY": size,
      };
    } else return {};
  }, [size]);

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
      style={style}
    >
      <div className={cn(st.ACorner_container)} />
      {side === EACornerSide.Inside && <CornerInside />}
      {side === EACornerSide.Outside && <CornerOutside />}
    </div>
  );
};

export default ACorner;
