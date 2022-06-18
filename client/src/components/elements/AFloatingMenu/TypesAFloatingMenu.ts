import { Placement } from "@floating-ui/react-dom-interactions";
import { EClass } from "constants/common/EClass";
import { ReactElement, ReactNode } from "react";
import { UtilMakeOptional } from "utils/typescriptUtils";
import useAFloating from "./useAFloating";

export enum EFloatingMode {
  Dialog = "Dialog",
  Dropdown = "Dropdown",
}

export interface PAFloatingPlatform extends IUseFloatingProps {
  content: ReactNode;
  triggerElement: ReactElement<{ floatingMenu: TFloatingReferenceProps }>;
  floatingMenu?: {
    classNameWrapper?: string;
  };
}

export type ReturnTypeUseFloating = ReturnType<typeof useAFloating>;

export interface IUseFloatingProps {
  arrowKind?: "beam" | "triangle";
  content?: ReactNode;
  location?: EClass;
  locationX?: EClass;
  locationY?: EClass;
  mode?: EFloatingMode;
  placement?: Placement;
  gapHeight?: number;
}

export type TFloatingReferenceProps = UtilMakeOptional<
  Pick<
    ReturnTypeUseFloating,
    | "reference"
    | "floatingDisappearing"
    | "floatingOpened"
    | "hasMenu"
    | "setFloatingDisappearing"
    | "setFloatingOpened"
    | "placement"
  > &
    Pick<IUseFloatingProps, "arrowKind">
>;

export type TFloatingElementProps = {
  classNameWrapper?: string;
} & Omit<
  ReturnTypeUseFloating,
  "reference" | "floatingOpened" | "hasMenu" | "setFloatingOpened"
> &
  Pick<IUseFloatingProps, "content" | "arrowKind">;

// export type RTUseMenu = ReturnType<typeof useAFloating>;

// type PForAFloatingPlatformChild =
//   | "hasMenu"
//   | "floatingOpened"
//   | "setFloatingOpened"
//   | "reference";

// type PForAFloatingAndReferenceCommon =
//   | "floatingDisappearing"
//   | "setFloatingDisappearing";

// type PForAFloatingRef = Pick<
//   RTUseMenu,
//   PForAFloatingPlatformChild | PForAFloatingAndReferenceCommon
// >;

// export type ReturnTypeUseFloating = {
//   [Property in keyof PForAFloatingRef]+?: PForAFloatingRef[Property];
// };

// export type PAFloatingMenu = IUseFloatingProps &
//   Omit<RTUseMenu, PForAFloatingPlatformChild>;
