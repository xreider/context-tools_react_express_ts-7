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
import AFloatingPlatform from "components/elements/AFloatingMenu/AFloatingPlatform";

export interface PAMainNavbar {
  propsWrapper?: ComponentPropsWithoutRef<"div">;
  propsContainer?: ComponentPropsWithoutRef<"div">;
}

const AMainNavbar: FC<PAMainNavbar> = ({ propsWrapper, propsContainer }) => {
  // const [overflowed, setOverflowed] = useState(false);
  const { width } = useCustomWindowInnerSize({});
  const [widthNavbarMax, spaceNormal, spaceToScreenEdges, heightANavbarPanel] =
    useGetCssValueNum([
      ECssSizeTitle.WidthNavbarMax,
      ECssSizeTitle.SpaceNormal,
      ECssSizeTitle.SpaceToScreenEdges,
      ECssSizeTitle.HeightANavbarPanel,
    ]);
  const twoSliceMode = useMemo(
    () => width <= widthNavbarMax,
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
              st.AMainNavbarItemStyle,
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
            propsContainer={{ className: st.AMainNavbarItemStyle }}
          />
        )}
        {twoSliceMode && width >= 400 && <div className={cn(st.filler)} />}

        <AFloatingPlatform
          content={"comment"}
          triggerElement={
            <ABtn
              behaviour="neumorphicHiddenOnCalm"
              kind="flex"
              propsWrapper={{
                className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
              }}
              elements={[{ text: "10" }, { icon: EAIcons.comment }]}
              stylesOnFloatingOpened={st}
            />
          }
          mode={EFloatingMode.Dialog}
          locationX={EClass.ArticleContent}
          arrowKind="beam"
          gapHeight={
            twoSliceMode
              ? heightANavbarPanel + 2 * spaceNormal + spaceToScreenEdges
              : spaceNormal + spaceToScreenEdges
          }
          floatingMenu={{
            classNameWrapper: st.floatingMenu,
          }}
        />

        <AFloatingPlatform
          content={"bell"}
          triggerElement={
            <ABtn
              behaviour="neumorphicHiddenOnCalm"
              kind="flex"
              propsWrapper={{
                className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
              }}
              elements={[{ text: "5" }, { icon: EAIcons.bell }]}
              stylesOnFloatingOpened={st}
            />
          }
          mode={EFloatingMode.Dialog}
          locationX={EClass.ArticleContent}
          arrowKind="beam"
          gapHeight={
            twoSliceMode
              ? heightANavbarPanel + 2 * spaceNormal + spaceToScreenEdges
              : spaceNormal + spaceToScreenEdges
          }
          floatingMenu={{
            classNameWrapper: st.floatingMenu,
          }}
        />

        <AFloatingPlatform
          mode={EFloatingMode.Dialog}
          locationX={EClass.ArticleContent}
          arrowKind="beam"
          gapHeight={
            twoSliceMode
              ? heightANavbarPanel + 2 * spaceNormal + spaceToScreenEdges
              : spaceNormal + spaceToScreenEdges
          }
          floatingMenu={{
            classNameWrapper: st.floatingMenu,
          }}
          content={
            <AFloatingPlatform
              mode={EFloatingMode.Dialog}
              locationX={EClass.ArticleContent}
              arrowKind="beam"
              floatingMenu={{
                classNameWrapper: st.floatingMenu,
              }}
              gapHeight={0}
              content={
                <AFloatingPlatform
                  mode={EFloatingMode.Dialog}
                  locationX={EClass.ArticleContent}
                  arrowKind="beam"
                  gapHeight={0}
                  content={"Menu2"}
                  triggerElement={
                    <ABtn
                      behaviour="neumorphicHiddenOnCalm"
                      kind="flex"
                      propsWrapper={{
                        className: cn(
                          st.AMainNavbarItem,
                          st.AMainNavbarItemStyle
                        ),
                      }}
                      elements={[{ icon: EAIcons.menu }]}
                    />
                  }
                />
              }
              triggerElement={
                <ABtn
                  behaviour="neumorphicHiddenOnCalm"
                  kind="flex"
                  propsWrapper={{
                    className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
                  }}
                  elements={[{ icon: EAIcons.menu }]}
                />
              }
            />
          }
          triggerElement={
            <ABtn
              behaviour="neumorphicHiddenOnCalm"
              kind="flex"
              propsWrapper={{
                className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
              }}
              elements={[{ icon: EAIcons.menu }]}
              stylesOnFloatingOpened={st}
            />
          }
        />
      </div>
      {twoSliceMode && (
        <div
          className={cn(st.AMainNavbar_container, propsContainer?.className)}
        >
          <AMainNavbarSearchBar
            propsContainer={{ className: st.AMainNavbarItemStyle }}
          />
        </div>
      )}
    </div>
  );
};

export default AMainNavbar;
