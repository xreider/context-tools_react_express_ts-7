import { Placement } from "@floating-ui/react-dom-interactions";
import { ReactNode } from "react";
import useMenu from "./useAFloating";

export enum EFloatingMode {
  Dialog = "Dialog",
  DialogInContentWithSideMenu = "DialogInContentWithSideMenu",
  Dropdown = "Dropdown",
}

export interface IFloatingProps {
  floatingProps?: {
    children?: ReactNode;
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
