import { ChangeEvent, ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import AInput from "components/elements/form/AInput/AInput";
import { EAIcons } from "components/elements/AIcon/AIcon";

export interface PAMainNavbarSearchBar {
  // classNameWrapper?: string;
  // propsWrapper?: ComponentPropsWithoutRef<"div">;
  // classNameContainer?: string;
  propsContainer?: ComponentPropsWithoutRef<"div">;

  onSearchFormInputChangeCb?: (event: ChangeEvent<HTMLInputElement>) => void;
  // overflowed?: boolean;
}

const AMainNavbarSearchBar: FC<PAMainNavbarSearchBar> = ({
  // classNameWrapper,
  // propsWrapper,
  // classNameContainer,
  propsContainer,
  onSearchFormInputChangeCb,
  // overflowed,
}) => {
  return (
    <AInput
      behaviour="neumorphicHiddenOnCalm"
      classNameContainer={cn(
        st.AMainNavbarSearchBar_container,
        propsContainer?.className
        // overflowed && st.overflowed
        // focused && st.focused
      )}
      kind="simpleBorderIsAfter"
      propsInput={{
        placeholder: "Поиск",
      }}
      prefixBtns={[{ elements: [{ icon: EAIcons.search }] }]}
      postfixBtns={[{ elements: [{ icon: EAIcons.manualInput }] }]}
      onChangeCb={onSearchFormInputChangeCb}
      // onBlurCb={() => {
      //   setFocused(false);
      // }}
      // onFocusCb={() => {
      //   setFocused(true);
      // }}
    />
  );
};

export default AMainNavbarSearchBar;
