import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import {
  useFloating,
  useRole,
  useInteractions,
} from "@floating-ui/react-dom-interactions";
import { v4 as uuidv4 } from "uuid";

import st from "./styles.module.scss";
import stTippy from "./stylesTippy.module.scss";
import ABtn, { PABtn } from "components/elements/ABtn/ABtn";
import { EAIcons } from "components/elements/AIcon/AIcon";
import { EFieldColorCN } from "constants/common/colors";

import { ReactComponent as CornerInside } from "public/img/elements/cornerInside.svg";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { ECssSizeTitle } from "constants/common/cssTitles";

export interface PAInput {
  // wrapper
  // classNameWrapper?: string;
  // propsWrapper?: ComponentPropsWithoutRef<"div">;

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
  kind?: "simple";

  // callbacks
  onBlurCb?: (event: FocusEvent<HTMLDivElement, Element>) => void;
  onChangeCb?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocusCb?: (event: FocusEvent<HTMLDivElement, Element>) => void;

  // menu
  menuWrapperContainerId?: string;
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

  // menu
  menuWrapperContainerId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [tooltipOpen, setTooltipOpen] = useState(false)
  const [focused, setFocused] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    context,
    // x,
    y,
    reference: wrapperRef,
    floating,
    strategy,
  } = useFloating({
    open: focused,
    placement: "bottom",
    onOpenChange: setFocused,
  });

  const [spaceNormal] = useGetCssValueNum([ECssSizeTitle.spaceNormal]);
  const { width } = useCustomWindowInnerSize();
  const [menuOpt, setMenuOpt] = useState<{
    menuWrapperWidth: number;
    beamWrapperWidth: number;
    offsetLeftMenuWrapper: number;
    offsetLeftBeamWrapper: number;
    offestMarginLeftBeamWrapper: number;
    showLeftCorner: boolean;
    showRightCorner: boolean;
  }>({
    menuWrapperWidth: 0,
    beamWrapperWidth: 0,
    offsetLeftMenuWrapper: 0,
    offsetLeftBeamWrapper: 0,
    offestMarginLeftBeamWrapper: 0,
    showLeftCorner: false,
    showRightCorner: false,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, {
      enabled: true,
      role: "menu",
    }),
  ]);
  if (propsInput?.type === "number") eraseEnabled = false;
  const prefixBtnsArr = useCallback(() => genBtns(prefixBtns), [prefixBtns]);
  const postfixBtnsArr = useCallback(() => genBtns(postfixBtns), [postfixBtns]);

  const AInputContainerId = useMemo(() => `AInputContainerId_${uuidv4()}`, []);
  const AInputMenuId = useMemo(() => `AInputMenuId_${uuidv4()}`, []);

  useEffect(() => {
    if (focused) {
      if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
      setMenuShow(true);
    } else {
      menuCloseTimer.current = setTimeout(() => {
        setMenuShow(false);
      }, 300);
    }
  }, [focused]);

  useEffect(() => {
    if (!width || !focused) return;
    let menuWrapperContainer: HTMLElement | null;
    let beamWrapperContainer: HTMLElement | null;
    let offsetLeftMenuWrapper: number;
    let offsetLeftBeamWrapper: number;
    let offestMarginLeftBeamWrapper: number;
    let offsetRightMenuWrapper: number;
    let offsetRightBeamWrapper: number;
    let menuWrapperWidth: number;
    let beamWrapperWidth: number;
    let showLeftCorner: boolean;
    let showRightCorner: boolean;

    if (typeof menuWrapperContainerId === "string") {
      menuWrapperContainer = document.getElementById(menuWrapperContainerId);
      beamWrapperContainer = document.getElementById(AInputContainerId);

      offsetLeftMenuWrapper = menuWrapperContainer?.offsetLeft ?? 0;
      offsetLeftBeamWrapper = beamWrapperContainer?.offsetLeft ?? 0;

      // console.log("offsetLeftMenuWrapper", offsetLeftMenuWrapper);
      // console.log("offsetLeftBeamWrapper", offsetLeftBeamWrapper);
      if (offsetLeftMenuWrapper >= offsetLeftBeamWrapper) {
        offsetLeftBeamWrapper = offsetLeftMenuWrapper;
      }

      offestMarginLeftBeamWrapper =
        offsetLeftBeamWrapper - offsetLeftMenuWrapper;

      offsetRightMenuWrapper =
        (menuWrapperContainer &&
          window.innerWidth -
            menuWrapperContainer?.getBoundingClientRect?.().right) ??
        0;
      offsetRightBeamWrapper =
        (beamWrapperContainer &&
          window.innerWidth -
            beamWrapperContainer?.getBoundingClientRect?.().right) ??
        0;

      menuWrapperWidth = menuWrapperContainer?.clientWidth ?? 0;
      beamWrapperWidth = beamWrapperContainer?.clientWidth ?? 0;

      if (beamWrapperWidth >= menuWrapperWidth) {
        menuWrapperWidth = beamWrapperWidth;
        offsetLeftBeamWrapper = offsetLeftMenuWrapper;
        showLeftCorner = showRightCorner = false;
      } else {
        showLeftCorner = offsetLeftMenuWrapper !== offsetLeftBeamWrapper;
        showRightCorner = offsetRightMenuWrapper !== offsetRightBeamWrapper;
      }
    } else {
      menuWrapperContainer = beamWrapperContainer =
        document.getElementById(AInputContainerId);

      offsetLeftMenuWrapper = offsetLeftBeamWrapper =
        menuWrapperContainer?.offsetLeft ?? 0;

      offestMarginLeftBeamWrapper = 0;

      offsetRightBeamWrapper = offsetRightMenuWrapper =
        (menuWrapperContainer &&
          window.innerWidth -
            menuWrapperContainer?.getBoundingClientRect?.().right) ??
        0;

      menuWrapperWidth = beamWrapperWidth =
        menuWrapperContainer?.clientWidth ?? 0;

      showLeftCorner = showRightCorner = false;
    }

    setMenuOpt((state) => ({
      ...state,
      menuWrapperWidth,
      beamWrapperWidth,
      offsetLeftMenuWrapper,
      offsetLeftBeamWrapper,
      offestMarginLeftBeamWrapper,
      showLeftCorner,
      showRightCorner,
    }));
  }, [width, focused, AInputContainerId]);

  return (
    // <div {...propsWrapper} className={cn(st.AInput_wrapper, classNameWrapper)}>

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
        // console.dir(event);
        // console.dir(AInputMenuId);
        // if (!event.currentTarget.closest(`#${AInputMenuId}`)) {
        //   inputRef?.current?.focus();
        // }
        propsContainer?.onClick?.(event);
      }}
      onBlur={(event) => {
        // console.dir(event);
        // console.dir(AInputMenuId);

        // const childrenArr =
        //   typeof event.relatedTarget?.children !== "undefined" &&
        //   event.relatedTarget?.children.length &&
        //   Array.from(event.relatedTarget?.children!)?.some(
        //     (el) => el?.id! === AInputMenuId
        //   );

        const isClosestAInputContainer = event?.relatedTarget?.closest(
          `#${AInputContainerId}`
        );

        // console.log(relatedTarget);
        // console.log(childrenArr);

        if (isClosestAInputContainer) {
          return;
        }

        setFocused(false);
        onBlurCb?.(event);
        propsContainer?.onBlur?.(event);
      }}
      onFocus={(event) => {
        setFocused(true);
        onFocusCb?.(event);
        propsContainer?.onFocus?.(event);
      }}
      {...getReferenceProps({ ref: wrapperRef })}
      id={AInputContainerId}
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

      {menuShow && (
        <div
          className={cn(
            stTippy.ANavbarSearchInputTippy_wrapper,
            !focused && stTippy.disappear,
            !menuOpt.showLeftCorner && stTippy.hideLeftCorner,
            !menuOpt.showRightCorner && stTippy.hideRightCorner
          )}
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? "",
              left: menuOpt.offsetLeftMenuWrapper,
              width: menuOpt.menuWrapperWidth,
            },
          })}
        >
          <div
            className={stTippy.ANavbarSearchInputTippy_beamWrapper}
            style={{
              marginLeft: menuOpt.offestMarginLeftBeamWrapper,
              width: menuOpt.beamWrapperWidth,
            }}
          >
            <div className={stTippy.ANavbarSearchInputTippy_beamContainer}>
              {menuOpt.showLeftCorner && (
                <>
                  <div
                    className={cn(
                      stTippy.ANavbarSearchInputTippy_beamCorners,
                      stTippy.ANavbarSearchInputTippy_beamLeftCorner
                    )}
                  >
                    <div
                      className={cn(
                        stTippy.ANavbarSearchInputTippy_beamCornersCircle,
                        stTippy.ANavbarSearchInputTippy_beamLeftCornerCircle
                      )}
                    />
                    <CornerInside
                      className={cn(
                        stTippy.ANavbarSearchInputTippy_beamCornersSvg,
                        stTippy.ANavbarSearchInputTippy_beamLeftCornerSvg
                      )}
                    />
                  </div>
                </>
              )}
              {menuOpt.showRightCorner && (
                <>
                  <div
                    className={cn(
                      stTippy.ANavbarSearchInputTippy_beamCorners,
                      stTippy.ANavbarSearchInputTippy_beamRightCorner
                    )}
                  >
                    <div
                      className={cn(
                        stTippy.ANavbarSearchInputTippy_beamCornersCircle,
                        stTippy.ANavbarSearchInputTippy_beamRightCornerCircle
                      )}
                    />
                    <CornerInside
                      className={cn(
                        stTippy.ANavbarSearchInputTippy_beamCornersSvg,
                        stTippy.ANavbarSearchInputTippy_beamRightCornerSvg
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={cn(stTippy.ANavbarSearchInputTippy_container)}
            id={AInputMenuId}
          >
            <div>
              <button>Hello</button>
            </div>
          </div>
        </div>
      )}
    </div>

    // </div>
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
