import { Placement } from "@floating-ui/react-dom-interactions";
import { EClass } from "constants/common/EClass";
import { ReactNode } from "react";
import useAFloating from "./useAFloating";

export enum EFloatingMode {
  Dialog = "Dialog",
  Dropdown = "Dropdown",
}

export interface IFloatingProps {
  arrowKind?: "beam" | "triangle";
  content?: ReactNode;
  location?: EClass;
  locationX?: EClass;
  locationY?: EClass;
  mode?: EFloatingMode;
  placement?: Placement;
}

export type RTUseMenu = ReturnType<typeof useAFloating>;

type PForAFloatingPlatformChild =
  | "hasMenu"
  | "floatingOpened"
  | "setFloatingOpened"
  | "reference";

type PForAFloatingAndReferenceCommon =
  | "floatingDisappearing"
  | "setFloatingDisappearing";

type PForAFloatingRef = Pick<
  RTUseMenu,
  PForAFloatingPlatformChild | PForAFloatingAndReferenceCommon
>;

export type ReturnTypeUseFloating = {
  [Property in keyof PForAFloatingRef]+?: PForAFloatingRef[Property];
};

export type PAFloatingMenu = IFloatingProps &
  Omit<RTUseMenu, PForAFloatingPlatformChild>;
