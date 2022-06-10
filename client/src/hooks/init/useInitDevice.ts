import { isMobileOnly } from "react-device-detect";
import { useLocalStorage } from "react-use";
import { useStoreDevice } from "stores/useStoreDevice";
import { useLayoutEffect } from "react";
import { EDevices } from "constants/common";

const useInitDevice = () => {
  const forcedDeviceFromLocalStorage =
    useLocalStorage<EDevices>("forcedDevice");

  const device = useStoreDevice((state) => state.device);
  const setDevice = useStoreDevice((state) => state.setDevice);

  useLayoutEffect(() => {
    let deviceVar;
    if (
      typeof forcedDeviceFromLocalStorage === "string" &&
      forcedDeviceFromLocalStorage in EDevices
    ) {
      deviceVar = forcedDeviceFromLocalStorage;
    } else {
      deviceVar = isMobileOnly ? EDevices.phone : EDevices.desktop;
    }
    document.body.dataset.device = deviceVar;
    setDevice(deviceVar);
  }, [device, forcedDeviceFromLocalStorage, setDevice]);
};

export default useInitDevice;
