import { FC, ReactNode } from "react";
import AFloatingMenu from "./AFloatingMenu";

import { IFloatingProps } from "./TypesAFloatingMenu";
import useAFloating from "./useAFloating";

export interface PAFloatingPlatform extends IFloatingProps {
  children: ReactNode;
}

const AFloatingPlatform: FC<PAFloatingPlatform> = ({
  children,
  floatingProps,
}) => {
  const {
    hasMenu,
    floatingOpened,
    reference,
    setFloatingOpened,
    ...otherFloatingProps
    // arrowCallback,
    // arrowStyle,
    // arrowX,
    // arrowY,
    // floating,
    // menuRightRadius,
    // menuX,
    // menuY,
    // strategy,
  } = useAFloating({ floatingProps });
  return (
    <>
      {children}
      {hasMenu && floatingOpened && (
        <AFloatingMenu {...otherFloatingProps} floatingProps={floatingProps} />
      )}
    </>
  );
};

export default AFloatingPlatform;
