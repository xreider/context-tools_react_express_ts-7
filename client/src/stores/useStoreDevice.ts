// import create, { GetState, SetState } from "zustand";
import { EDevices } from "constants/common";
import create from "zustand";

export type TDeviceState = {
  device: EDevices | undefined;
  setDevice: (device: EDevices) => void;
};

export const useStoreDevice = create<TDeviceState>((set, get) => ({
  device: undefined,
  setDevice: (device) =>
    set((state) => ({
      ...state,
      device,
    })),
}));
