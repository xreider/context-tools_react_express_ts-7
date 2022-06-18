import { FC, useState } from "react";
import cn from "classnames";
import st from "./stylesOrnament.module.scss";
import { EFieldColorCN } from "constants/common/colors";
import ACorner, {
  EACornerDirection,
  EACornerShadow,
  EACornerSide,
} from "components/elements/ACorner/ACorner";
import { ECssSizeTitle } from "constants/common/cssTitles";

export interface PAppOrnament {}

const AppOrnament: FC<PAppOrnament> = () => {
  return (
    <>
      <div className={cn(st.gradient, st.gradientTop)} />
      <div className={cn(st.gradient, st.gradientBottom)} />
      <div className={st.center} />
      <ACorner
        direction={EACornerDirection.BottomLeft}
        side={EACornerSide.Inside}
        shadow={EACornerShadow.Line}
        size={`var(${ECssSizeTitle.BorderRadiusVeryBig})`}
        propsWrapper={{
          className: cn(st.AppCorner, EFieldColorCN.readable),
        }}
      />
    </>
  );
};

export default AppOrnament;
