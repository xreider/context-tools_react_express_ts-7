import { ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";

export interface PAHeroSection {
  propsWrapper?: ComponentPropsWithoutRef<"div">;
  propsContainer?: ComponentPropsWithoutRef<"div">;
}

const AHeroSection: FC<PAHeroSection> = ({ propsWrapper, propsContainer }) => {
  return (
    <div
      {...propsWrapper}
      className={cn(st.AHeroSection_wrapper, propsWrapper?.className)}
    >
      <div
        {...propsContainer}
        className={cn(st.AHeroSection_container, propsContainer?.className)}
      >
        AHeroSection
      </div>
    </div>
  );
};

export default AHeroSection;
