import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import ABtn from "components/elements/ABtn/ABtn";
import { EAIcons } from "components/elements/AIcon/AIcon";
import { EFieldColorCN } from "constants/common/colors";
import AMainNavbarSearchBar from "../AMainNavbarSearchBar/AMainNavbarSearchBar";
import useCustomWindowInnerSize from "hooks/common/useCustomWindowInnerSize";
import { useGetCssValueNum } from "hooks/common/useGetCssVars";
import { ECssSizeTitle } from "constants/common/cssTitles";
import { EClass } from "constants/common/EClass";
import { EFloatingMode } from "components/elements/AFloatingMenu/TypesAFloatingMenu";

export interface PAMainNavbar {
  propsWrapper?: ComponentPropsWithoutRef<"div">;
  propsContainer?: ComponentPropsWithoutRef<"div">;
}

const AMainNavbar: FC<PAMainNavbar> = ({ propsWrapper, propsContainer }) => {
  // const [overflowed, setOverflowed] = useState(false);
  const { width } = useCustomWindowInnerSize({});
  const [widthNavbarMax] = useGetCssValueNum([ECssSizeTitle.WidthNavbarMax]);
  const twoSliceMode = useMemo(
    () => width < widthNavbarMax,
    [width, widthNavbarMax]
  );

  return (
    <div
      className={cn(
        EFieldColorCN.readable,
        st.AMainNavbar_wrapper,
        EClass.ANavbarWrapper,
        propsWrapper?.className
      )}
    >
      <div className={cn(st.AMainNavbar_container, propsContainer?.className)}>
        <ABtn
          active
          activeClassName={st.activeItem}
          behaviour="neumorphicHiddenOnCalm"
          kind="flex"
          propsWrapper={{
            className: cn(
              st.logo,
              st.AMainNavbarItem,
              st.AMainNavbarStyleItem,
              twoSliceMode && st.twoSliceMode
            ),
          }}
          elements={
            twoSliceMode
              ? [{ icon: EAIcons.logoTight }]
              : [{ icon: EAIcons.logoWide }]
          }
        />
        {!twoSliceMode && (
          <AMainNavbarSearchBar
            propsContainer={{ className: st.AMainNavbarStyleItem }}
          />
        )}
        {twoSliceMode && width >= 400 && <div className={cn(st.filler)} />}
        <ABtn
          behaviour="neumorphicHiddenOnCalm"
          kind="flex"
          propsWrapper={{
            className: cn(st.AMainNavbarItem, st.AMainNavbarStyleItem),
          }}
          elements={[{ text: "10" }, { icon: EAIcons.comment }]}
          floatingProps={{
            children: "Comments",
            mode: EFloatingMode.DialogInContentWithSideMenu,
          }}
        />
        <ABtn
          behaviour="neumorphicHiddenOnCalm"
          kind="flex"
          propsWrapper={{
            className: cn(st.AMainNavbarItem, st.AMainNavbarStyleItem),
          }}
          elements={[{ text: "5" }, { icon: EAIcons.bell }]}
          floatingProps={{
            children: "Notifications",
            mode: EFloatingMode.DialogInContentWithSideMenu,
          }}
        />
        <ABtn
          behaviour="neumorphicHiddenOnCalm"
          kind="flex"
          propsWrapper={{
            className: cn(st.AMainNavbarItem, st.AMainNavbarStyleItem),
          }}
          elements={[{ icon: EAIcons.menu }]}
          floatingProps={{
            children: "Menu",
            mode: EFloatingMode.DialogInContentWithSideMenu,
          }}
        />
      </div>
      {twoSliceMode && (
        <div
          className={cn(st.AMainNavbar_container, propsContainer?.className)}
        >
          <AMainNavbarSearchBar
          // overflowed={overflowed}
          />
        </div>
      )}
    </div>
  );
};

export default AMainNavbar;
