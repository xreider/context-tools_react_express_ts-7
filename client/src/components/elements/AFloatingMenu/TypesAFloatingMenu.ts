import { Placement } from "@floating-ui/react-dom-interactions";
import { EClass } from "constants/common/EClass";
import { ReactNode } from "react";
import useMenu from "./useAFloating";

export enum EFloatingMode {
  Dialog = "Dialog",
  Dropdown = "Dropdown",
}

export interface IFloatingProps {
  floatingProps?: {
    arrowKind?: "beam" | "triangle";
    children?: ReactNode;
    location?: EClass;
    locationX?: EClass;
    locationY?: EClass;
    mode?: EFloatingMode;
    placement?: Placement;
  };
}

export type RTUseMenu = ReturnType<typeof useMenu>;

export type PAFloatingMenu = IFloatingProps &
  Omit<
    RTUseMenu,
    "hasMenu" | "floatingOpened" | "setFloatingOpened" | "reference"
  >;
