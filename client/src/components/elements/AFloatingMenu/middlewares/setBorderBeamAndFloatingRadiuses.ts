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
  } else if (borderRadiusFloating >= fromLeftEdgeFloatingToLeftEdgeRef) {
    // if left-right distance from ref to float are very little
    // less than borderRadiusFloating
    beamLeftRadius = Math.max(0, Math.floor(fromLeftEdgeFloatingToLeftEdgeRef));
    floatingLeftRadius = 0;
  } else {
    // if left-right distance from ref to float are between
    // sum of borderRadiusReference and borderRadiusFloating
    beamLeftRadius = floatingLeftRadius = Math.max(
      0,
      Math.floor(fromLeftEdgeFloatingToLeftEdgeRef / 2)
    );
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
  } else if (borderRadiusFloating >= fromLeftEdgeFloatingToLeftEdgeRef) {
    // if left-right distance from ref to float are very little,
    // less than borderRadiusFloating
    beamRightRadius = Math.max(
      0,
      Math.floor(fromRightEdgeFloatingToRightEdgeRef)
    );
    floatingRightRadius = 0;
  } else {
    // if left-right distance from ref to float are between
    // sum of borderRadiusReference and borderRadiusFloating
    beamRightRadius = floatingRightRadius = Math.max(
      0,
      Math.floor(fromRightEdgeFloatingToRightEdgeRef / 2)
    );
  }

  const minBeamRadius = Math.min(beamLeftRadius, beamRightRadius);

  setRadiusesBeamMode({
    floatingLeft: floatingLeftRadius,
    floatingRight: floatingRightRadius,
    beamLeft:
      minBeamRadius < borderRadiusReference / 2
        ? beamLeftRadius
        : minBeamRadius,
    beamRight:
      minBeamRadius < borderRadiusReference / 2
        ? beamRightRadius
        : minBeamRadius,
  });

  // setRadiusesBeamMode({
  //   floatingLeft: floatingLeftRadius,
  //   floatingRight: floatingRightRadius,
  //   beamLeft: beamLeftRadius,
  //   beamRight: beamRightRadius,
  // });
};
