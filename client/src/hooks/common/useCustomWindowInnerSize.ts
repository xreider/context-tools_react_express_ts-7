import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";
import { ESpeed } from "constants/common";

interface PCustomWindowInnerSize {
  delay?: ESpeed;
  enabled?: boolean;
}

function useCustomWindowInnerSize({
  delay = ESpeed.debounceDelay,
  enabled = true,
}: PCustomWindowInnerSize) {
  const [width, setWidth] = useState(enabled ? window.innerWidth : 0);
  const [height, setHeight] = useState(enabled ? window.innerHeight : 0);

  useLayoutEffect(() => {
    if (!enabled) return;
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    const debouncedHandleResize = debounce(handleResize, delay);
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [delay, enabled]);

  if (!enabled) return { width: 0, height: 0 };
  return { width, height };
}

export default useCustomWindowInnerSize;
