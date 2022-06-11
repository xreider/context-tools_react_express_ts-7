import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FC,
  FocusEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import st from "./styles.module.scss";
import ABtn, { PABtn } from "components/elements/ABtn/ABtn";
import { EAIcons } from "components/elements/AIcon/AIcon";
import { EFieldColorCN } from "constants/common/colors";

export interface PAInput {
  // container
  classNameContainer?: string;
  propsContainer?: ComponentPropsWithoutRef<"div">;
  // input
  classNameInput?: string;
  propsInput?: ComponentPropsWithoutRef<"input">;

  // prefix
  prefixBtns?: PABtn[];

  // postfix
  postfixBtns?: PABtn[];

  // others
  behaviour?: "neumorphicHiddenOnCalm";
  eraseEnabled?: boolean;
  kind?: "simple" | "simpleBorderIsAfter";

  // callbacks
  onBlurCb?: (event: FocusEvent<HTMLDivElement, Element>) => void;
  onChangeCb?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocusCb?: (event: FocusEvent<HTMLDivElement, Element>) => void;
}

const AInput: FC<PAInput> = ({
  // wrapper
  // classNameWrapper,
  // propsWrapper,

  // container
  classNameContainer,
  propsContainer,
  // input
  classNameInput,
  propsInput,

  // prefix
  prefixBtns,

  // postfix
  postfixBtns,

  // others
  behaviour,
  eraseEnabled = true,
  kind,

  // callbacks
  onBlurCb,
  onChangeCb,
  onFocusCb,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [tooltipOpen, setTooltipOpen] = useState(false)
  const [focused, setFocused] = useState(false);

  if (propsInput?.type === "number") eraseEnabled = false;
  const prefixBtnsArr = useCallback(() => genBtns(prefixBtns), [prefixBtns]);
  const postfixBtnsArr = useCallback(() => genBtns(postfixBtns), [postfixBtns]);

  return (
    <div
      {...propsContainer}
      className={cn(
        behaviour && st[`behaviour_${behaviour}`],
        classNameContainer,
        focused && EFieldColorCN.readable,
        focused && st.focused,
        kind && st[`kind_${kind}`],
        st.AInput_container
      )}
      onClick={(event) => {
        propsContainer?.onClick?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlurCb?.(event);
        propsContainer?.onBlur?.(event);
      }}
      onFocus={(event) => {
        setFocused(true);
        onFocusCb?.(event);
        propsContainer?.onFocus?.(event);
      }}
    >
      {prefixBtnsArr()}
      <input
        {...propsInput}
        onChange={(event) => {
          onChangeCb?.(event);
          propsContainer?.onChange?.(event);
        }}
        ref={inputRef}
        className={cn(
          st.AInput_input,
          classNameInput,
          prefixBtns?.length && st.AInput_input_hasPrefixBtns,
          (eraseEnabled || postfixBtns?.length) &&
            st.AInput_input_hasPostfixBtns
        )}
      />

      <ABtn
        elements={[{ icon: EAIcons.erase }]}
        kind="flex"
        propsWrapper={{
          className: cn(
            st.AInput_eraseBtn,
            (propsInput?.value || propsInput?.value === 0) &&
              st.AInput_eraseBtn_shown
          ),
          onClick: (event) => {
            if (propsInput?.value || propsInput?.value === 0) {
            } else {
              inputRef?.current?.focus();
            }
          },
        }}
      />
      {postfixBtnsArr()}
    </div>
  );
};

export default AInput;

function genBtns(arrBtns?: PABtn[]) {
  if (!arrBtns || arrBtns.length === 0) return null;

  return arrBtns?.map((el, i) => {
    let isDecoration = Boolean(!el.propsWrapper || !el.propsWrapper.onClick);

    return (
      <ABtn
        kind="flex"
        behaviour={isDecoration ? "none" : undefined}
        {...el}
        propsWrapper={{
          ...el.propsWrapper,
          className: cn(
            st.AInput_sideBtn,
            el.propsWrapper?.className,
            isDecoration && st.AInput_sideBtn_decoration
          ),
          onClick: (event) => {
            if (!isDecoration) {
              // event.stopPropagation();
              el.propsWrapper?.onClick?.(event);
            }
          },
        }}
        key={i}
      />
    );
  });
}
