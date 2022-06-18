import { EDevices } from "constants/common";
import { useStoreDevice } from "stores/useStoreDevice";

export const useStoreGetDevice = () => {
  let deviceFromStore;
  let isPhone;
  let isDesktop;

  deviceFromStore = useStoreDevice.getState().device;
  isPhone = deviceFromStore === EDevices.phone;
  isDesktop = !isPhone;
  return { isPhone, isDesktop };
};
