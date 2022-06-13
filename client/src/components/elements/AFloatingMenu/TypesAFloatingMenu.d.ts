import { Placement } from "@floating-ui/react-dom-interactions";
import useMenu from "./useMenu";

export interface IMenuProps {
  menuProps?: {
    children?: ReactNode;
    mode?: "modal";
    placement?: Placement;
  };
}

export type RTUseMenu = ReturnType<typeof useMenu>;

export type PAFloatingMenu = IMenuProps &
  Omit<RTUseMenu, "hasMenu" | "menuOpened" | "setMenuOpened" | "reference">;
