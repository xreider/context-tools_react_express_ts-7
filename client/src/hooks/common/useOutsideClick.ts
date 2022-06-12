import { MutableRefObject, useEffect } from "react";

export const useOutsideClick = (
  refs: MutableRefObject<any>[], // array of elements,
  // if click on them, cb functuion doesn't work
  cb: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;
    function handleClickOutside(event: Event) {
      if (
        refs.every((el) => el.current && !el.current?.contains?.(event?.target))
      ) {
        document.removeEventListener("click", handleClickOutside);
        cb();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs, cb, enabled]);
};
