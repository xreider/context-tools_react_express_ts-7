import React, { FC, ReactElement, ReactNode } from "react";
import AFloatingMenu from "./AFloatingMenu";

import { IFloatingProps, ReturnTypeUseFloating } from "./TypesAFloatingMenu";
import useAFloating from "./useAFloating";

export interface PAFloatingPlatform extends IFloatingProps {
  content: ReactNode;
  children: ReactElement<ReturnTypeUseFloating>;
}

const AFloatingPlatform: FC<PAFloatingPlatform> = ({
  children,
  ...floatingProps
}) => {
  const otherFloatingProps = useAFloating(floatingProps);

  const {
    hasMenu,
    floatingOpened,
    reference,
    setFloatingOpened,
    floatingDisappearing,
    setFloatingDisappearing,
  }: ReturnTypeUseFloating = otherFloatingProps;
  return (
    <>
      {React.cloneElement(children, {
        hasMenu,
        floatingOpened,
        reference,
        setFloatingOpened,
        floatingDisappearing,
        setFloatingDisappearing,
      })}
      {hasMenu && floatingOpened && (
        <AFloatingMenu {...otherFloatingProps} {...floatingProps} />
      )}
    </>
  );
};

export default AFloatingPlatform;
