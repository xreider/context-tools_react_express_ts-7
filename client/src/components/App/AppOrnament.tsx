import { FC } from "react";
import { ReactComponent as CornerInside } from "public/img/elements/cornerInside.svg";
import cn from "classnames";
import st from "./stylesOrnament.module.scss";
import { EFieldColorCN } from "constants/common/colors";

export interface PAppOrnament {}

const AppOrnament: FC<PAppOrnament> = () => {
  return (
    <>
      <div className={cn(st.gradient, st.gradientTop)} />
      <div className={cn(st.gradient, st.gradientBottom)} />
      <div className={st.center} />
      <CornerInside
        className={cn(
          st.AppCorner,
          st.AppCornerRightTop,
          EFieldColorCN.readable
        )}
      />
    </>
  );
};

export default AppOrnament;
