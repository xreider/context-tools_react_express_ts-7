import { MiddlewareArguments } from "@floating-ui/core";
import { CSSProperties, Dispatch, SetStateAction } from "react";

interface PSetArrowBeamStyle {
  args: MiddlewareArguments;
  enable?: boolean;
  setArrowStyle: Dispatch<SetStateAction<CSSProperties>>;
}
export const setArrowBeamStyle = ({
  args,
  enable = true,
  setArrowStyle,
}: PSetArrowBeamStyle) => {
  if (!enable) return;
  const { x: floatingX, y: floatingY, rects, placement } = args;
  if (placement === "bottom") {
    const heightBetweenRefAndFloating =
      floatingY - rects.reference.height - rects.reference.y;

    setArrowStyle((state) => ({
      ...state,
      position: "absolute",
      top: -1 * heightBetweenRefAndFloating - 1,
      left: rects.reference.x - floatingX,
      height: heightBetweenRefAndFloating + 1.2,
      width: rects.reference.width,
    }));
  } else if (placement === "top") {
    const heightBetweenRefAndFloating =
      rects.reference.y - floatingY - rects.floating.height;

    // console.log(heightBetweenRefAndFloating);

    setArrowStyle((state) => ({
      ...state,
      top: "unset",
      position: "absolute",
      bottom: -1 * heightBetweenRefAndFloating - 1,
      left: rects.reference.x - floatingX,
      height: heightBetweenRefAndFloating + 1.2,
      width: rects.reference.width,
    }));
  }
};
