import { useEffect, useRef } from "react";

// This hooks is using for live up (refresh) webkitscrollbar,
// which has issues when navigating through tabs.
// Issue is it can floatingDisappearing

const useRefreshWebktiScrollbar = () => {
  let timer = useRef<ReturnType<typeof setTimeout>>();

  const onFocus = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    document.body.classList.add("_refreshingWebkitScrollBar");

    setTimeout(() => {
      document.body.classList.remove("_refreshingWebkitScrollBar");
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      window.removeEventListener("focus", onFocus);
    };
  }, []);
};

export default useRefreshWebktiScrollbar;
