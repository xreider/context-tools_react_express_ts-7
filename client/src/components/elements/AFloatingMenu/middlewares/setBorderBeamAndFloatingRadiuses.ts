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

  const beamLittleSizeFactor = 0.7;
  const floatingLittleSizeFactor = 1 - beamLittleSizeFactor;

  const sizeMaxLimit = 70;

  let floatingLeftRadius = 0,
    floatingRightRadius = 0,
    beamLeftDistanceX = 0,
    beamLeftDistanceY = 0,
    beamRightDistanceX = 0,
    beamRightDistanceY = 0;

  // handling distanceY
  if (placement === "bottom") {
    beamLeftDistanceY = beamRightDistanceY =
      floatingY - borderRadiusReference - rects.reference.y;
  } else if (placement === "top") {
    beamLeftDistanceY = beamRightDistanceY =
      rects.reference.height +
      rects.reference.y -
      floatingY -
      rects.floating.height -
      borderRadiusReference;
  }

  // handling left corner distanceX and left floating border radius
  const fromLeftEdgeFloatingToLeftEdgeRef = rects.reference.x - floatingX;

  if (fromLeftEdgeFloatingToLeftEdgeRef > borderRadiusFloating * 2) {
    floatingLeftRadius = borderRadiusFloating;
    beamLeftDistanceX =
      fromLeftEdgeFloatingToLeftEdgeRef - borderRadiusFloating;
  } else {
    floatingLeftRadius = Math.max(
      0,
      fromLeftEdgeFloatingToLeftEdgeRef * floatingLittleSizeFactor
    );
    beamLeftDistanceX = Math.max(
      0,
      fromLeftEdgeFloatingToLeftEdgeRef * beamLittleSizeFactor
    );
  }

  // handling right corner distanceX and right floating border radius
  const fromRightEdgeFloatingToRightEdgeRef =
    floatingX +
    rects.floating.width -
    rects.reference.x -
    rects.reference.width;

  if (fromRightEdgeFloatingToRightEdgeRef > borderRadiusFloating * 2) {
    floatingRightRadius = borderRadiusFloating;
    beamRightDistanceX =
      fromRightEdgeFloatingToRightEdgeRef - borderRadiusFloating;
  } else {
    floatingRightRadius = Math.max(
      0,
      fromRightEdgeFloatingToRightEdgeRef * floatingLittleSizeFactor
    );
    beamRightDistanceX = Math.max(
      0,
      fromRightEdgeFloatingToRightEdgeRef * beamLittleSizeFactor
    );
  }

  // console.log(
  //   "11",
  //   floatingLeftRadius,
  //   floatingRightRadius,
  //   beamLeftDistanceX,
  //   beamLeftDistanceY,
  //   beamRightDistanceX,
  //   beamRightDistanceY
  // );

  floatingLeftRadius = refactorFloatRadius(floatingLeftRadius);
  floatingRightRadius = refactorFloatRadius(floatingRightRadius);

  beamLeftDistanceX = refactorBeamDist(beamLeftDistanceX, sizeMaxLimit);
  beamLeftDistanceY = refactorBeamDist(beamLeftDistanceY, sizeMaxLimit);
  beamRightDistanceX = refactorBeamDist(beamRightDistanceX, sizeMaxLimit);
  beamRightDistanceY = refactorBeamDist(beamRightDistanceY, sizeMaxLimit);

  setRadiusesBeamMode({
    floatingLeftRadius,
    floatingRightRadius,
    beamLeftDistanceX,
    beamLeftDistanceY,
    beamRightDistanceX,
    beamRightDistanceY,
  });
};

function refactorFloatRadius(distance: number) {
  return roundNumber(Math.max(distance, 0));
}

function refactorBeamDist(distance: number, limit: number) {
  // return Math.floor(Math.max(Math.min(limit, distance), 0));
  return Math.max(roundNumber(Math.min(limit, distance)), 0);
}

function roundNumber(num: number) {
  return Math.floor(num * Math.pow(10, 1)) / Math.pow(10, 1);
}
