import React, { FC, ReactElement, ReactNode } from "react";
import AFloatingMenu from "./AFloatingMenu";

import {
  PAFloatingPlatform,
  ReturnTypeUseFloating,
} from "./TypesAFloatingMenu";
import useAFloating from "./useAFloating";

const AFloatingPlatform: FC<PAFloatingPlatform> = ({
  triggerElement,
  floatingMenu,
  ...floatingProps
}) => {
  const useAFloatingResult = useAFloating(floatingProps);

  const { hasMenu, floatingOpened }: ReturnTypeUseFloating = useAFloatingResult;
  return (
    <>
      {hasMenu && floatingOpened && (
        <AFloatingMenu
          classNameWrapper={floatingMenu?.classNameWrapper}
          {...useAFloatingResult}
          {...floatingProps}
        />
      )}
      {React.cloneElement(triggerElement, {
        // hasMenu,
        // floatingOpened,
        // reference,
        // setFloatingOpened,
        // floatingDisappearing,
        // setFloatingDisappearing,

        floatingMenu: {
          ...useAFloatingResult,
          arrowKind: floatingProps.arrowKind,
        },
      })}
    </>
  );
};

export default AFloatingPlatform;
