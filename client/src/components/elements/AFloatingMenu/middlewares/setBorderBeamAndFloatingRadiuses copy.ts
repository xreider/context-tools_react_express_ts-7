// @ts-nocheck

import { MiddlewareArguments } from "@floating-ui/react-dom-interactions";
import { Dispatch, SetStateAction } from "react";
import { PRadiusesBeamMode } from "../useAFloating";

interface PSetBorderBeamAndFloatingRadiuses {
  args: MiddlewareArguments;
  enable?: boolean;
  setRadiusesBeamMode: Dispatch<SetStateAction<PRadiusesBeamMode>>;
  borderRadiusReference: number;
  borderRadiusFloating: number;
}
export const setBorderBeamAndFloatingRadiuses = ({
  args,
  enable = true,
  setRadiusesBeamMode,
  borderRadiusReference,
  borderRadiusFloating,
}: PSetBorderBeamAndFloatingRadiuses) => {
  if (!enable) return;
  const { x: floatingX, y: floatingY, rects, placement } = args;

  let floatingLeftRadius = 0,
    floatingRightRadius = 0;
  beamLeftDistanceX = 0;
  beamLeftDistanceY = 0;
  beamRightDistanceX = 0;
  beamRightDistanceY = 0;

  const heightOfReference = Math.max(
    rects.reference.height - borderRadiusReference,
    rects.reference.height / 2
  );
  let heightBetweenRefAndFloating = 0;

  if (placement === "bottom") {
    heightBetweenRefAndFloating =
      floatingY - rects.reference.height - rects.reference.y;
  } else if (placement === "top") {
    heightBetweenRefAndFloating =
      rects.reference.y - floatingY - rects.floating.height;
  }

  const cutCornersInHalfMinWidth = borderRadiusReference + borderRadiusFloating;

  const fromLeftEdgeFloatingToLeftEdgeRef = rects.reference.x - floatingX;

  const fromRightEdgeFloatingToRightEdgeRef =
    floatingX +
    rects.floating.width -
    rects.reference.x -
    rects.reference.width;

  const beamCornerEstimatedHeight =
    heightOfReference + heightBetweenRefAndFloating;

  let beamLeftRadius: number,
    beamRightRadius: number,
    floatingLeftRadius: number | undefined,
    floatingRightRadius: number | undefined;

  console.log("borderRadiusFloating", borderRadiusFloating);
  console.log(
    "fromLeftEdgeFloatingToLeftEdgeRef",
    fromLeftEdgeFloatingToLeftEdgeRef
  );

  if (cutCornersInHalfMinWidth < fromLeftEdgeFloatingToLeftEdgeRef) {
    // if left-right distance from ref to float more than sum of border-radiuses of ref and float
    beamLeftRadius = Math.max(
      0,
      Math.floor(
        Math.min(
          beamCornerEstimatedHeight,
          fromLeftEdgeFloatingToLeftEdgeRef - borderRadiusFloating
        )
      )
    );
  } else {
    // if left-right distance from ref to float are between
    // sum of borderRadiusReference and borderRadiusFloating
    floatingLeftRadius = Math.max(0, fromLeftEdgeFloatingToLeftEdgeRef * 0.3);
    beamLeftRadius = Math.max(0, fromLeftEdgeFloatingToLeftEdgeRef * 0.7);
  }

  if (cutCornersInHalfMinWidth < fromRightEdgeFloatingToRightEdgeRef) {
    // if left-right distance from ref to float more than sum of border-radiuses of ref and float
    beamRightRadius = Math.max(
      0,
      Math.floor(
        Math.min(
          beamCornerEstimatedHeight,
          fromRightEdgeFloatingToRightEdgeRef - borderRadiusFloating
        )
      )
    );
  } else {
    // if left-right distance from ref to float are between
    // sum of borderRadiusReference and borderRadiusFloating
    floatingRightRadius = Math.max(
      0,
      fromRightEdgeFloatingToRightEdgeRef * 0.3
    );
    beamRightRadius = Math.max(0, fromRightEdgeFloatingToRightEdgeRef * 0.7);
  }

  setRadiusesBeamMode({
    floatingLeftRadius,
    floatingRightRadius,
    beamLeftDistanceX,
    beamLeftDistanceY,
    beamRightDistanceX,
    beamRightDistanceY,
  });
};
