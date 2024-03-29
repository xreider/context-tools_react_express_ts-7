import { FC } from "react";
import cn from "classnames";
import st from "./styles.module.scss";
import stOrnament from "./stylesOrnament.module.scss";
import AMainNavbar from "./AMainNavbar/AMainNavbar";
import { EFieldColorCN } from "constants/common/colors";
import useInitDevice from "hooks/init/useInitDevice";
import AppOrnament from "./AppOrnament";
import useRefreshWebktiScrollbar from "./useRefreshWebktiScrollbar";

import { EClass } from "constants/common/EClass";
import { useStoreGetDevice } from "stores/useStoreGetDevice";
import AFloatingPlatform from "components/elements/AFloatingMenu/AFloatingPlatform";
import { EFloatingMode } from "components/elements/AFloatingMenu/TypesAFloatingMenu";
import ABtn from "components/elements/ABtn/ABtn";
import { EAIcons } from "components/elements/AIcon/AIcon";
import AHeroSection from "components/sections/AHeroSection/AHeroSection";

export interface PApp {}

const App: FC<PApp> = () => {
  useInitDevice();
  const { isPhone } = useStoreGetDevice();
  useRefreshWebktiScrollbar();
  return (
    <div className={cn(EFieldColorCN.neutral, st.App_wrapper)}>
      <AMainNavbar propsWrapper={{ className: stOrnament.AppNavbar_wrapper }} />
      {!isPhone && <AppOrnament />}
      <AHeroSection />
      <div className={cn(st.content)}>
        <div className={cn(st.block, EFieldColorCN.readable)}>
          <div className={cn(EClass.ArticleContent)}>
            Почему он используется? Давно выяснено, что при оценке дизайна и
            композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
            используют потому, что тот обеспечивает более или менее стандартное
            заполнение шаблона, а также реальное распределение букв и пробелов в
            абзацах, которое не получается при простой дубликации "Здесь ваш
            текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы
            электронной вёрстки и редакторы HTML используют Lorem Ipsum в
            качестве текста по умолчанию, так что поиск по ключевым словам
            "lorem ipsum" сразу показывает, как много веб-страниц всё ещё
            дожидаются своего настоящего рождения. За прошедшие годы текст Lorem
            Ipsum получил много версий. Некоторые версии появились по ошибке,
            некоторые - намеренно (например, юмористические варианты). Откуда он
            появился? Многие думают, что Lorem Ipsum - взятый с потолка
            псевдо-латинский набор слов, но это не совсем так. Его корни уходят
            в один фрагмент классической латыни 45 года н.э., то есть более двух
            тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа
            Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в
            Lorem Ipsum, "consectetur", и занялся его поисками в классической
            латинской литературе. В результате он нашёл неоспоримый
            первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de
            Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной
            Цицероном в 45 году н.э. Этот трактат по теории этики был очень
            популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", происходит от одной из строк в разделе
            1.10.32 Классический текст Lorem Ipsum, используемый с XVI века,
            приведён ниже. Также даны разделы 1.10.32 и 1.10.33 "de Finibus
            Bonorum et Malorum" Цицерона и их английский перевод, сделанный H.
            Rackham, 1914 год. Где его взять? Есть много вариантов Lorem Ipsum,
            но большинство из них имеет не всегда приемлемые модификации,
            например, юмористические вставки или слова, которые даже отдалённо
            не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного
            проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в
            середине абзаца. Также все другие известные генераторы Lorem Ipsum
            используют один и тот же текст, который они просто повторяют, пока
            не достигнут нужный объём. Это делает предлагаемый здесь генератор
            единственным настоящим Lorem Ipsum генератором. Он использует
            словарь из более чем 200 латинских слов, а также набор моделей
            предложений. В результате сгенерированный Lorem Ipsum выглядит
            правдоподобно, не имеет повторяющихся абзацей или "невозможных"
            слов. Почему он используется? Давно выяснено, что при оценке дизайна
            и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
            используют потому, что тот обеспечивает более или менее стандартное
            заполнение шаблона, а также реальное распределение букв и пробелов в
            абзацах, которое не получается при простой дубликации "Здесь ваш
            текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы
            электронной вёрстки и редакторы HTML используют Lorem Ipsum в
            качестве текста по умолчанию, так что поиск по ключевым словам
            "lorem ipsum" сразу показывает, как много веб-страниц всё ещё
            дожидаются своего настоящего рождения. За прошедшие годы текст Lorem
            Ipsum получил много версий. Некоторые версии появились по ошибке,
            некоторые - намеренно (например, юмористические варианты). Откуда он
            появился? Многие думают, что Lorem Ipsum - взятый с потолка
            псевдо-латинский набор слов, но это не совсем так. Его корни уходят
            в один фрагмент классической латыни 45 года н.э., то есть более двух
            тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа
            Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в
            Lorem Ipsum, "consectetur", и занялся его поисками в классической
            латинской литературе. В результате он нашёл неоспоримый
            первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de
            Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной
            Цицероном в 45 году н.э. Этот трактат по теории этики был очень
            популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", происходит от одной из строк в разделе
            1.10.32 Классический текст Lorem Ipsum, используемый с XVI века,
            приведён ниже. Также даны
            <AFloatingPlatform
              content={"Menu2"}
              mode={EFloatingMode.Dialog}
              locationX={EClass.ArticleContent}
              arrowKind="beam"
              triggerElement={
                <ABtn
                  behaviour="neumorphicHiddenOnCalm"
                  kind="flex"
                  // propsWrapper={{
                  //   className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
                  // }}
                  elements={[{ icon: EAIcons.menu }]}
                />
              }
            />
            <AFloatingPlatform
              content={"Menu2"}
              mode={EFloatingMode.Dialog}
              locationX={EClass.ArticleContent}
              arrowKind="beam"
              triggerElement={
                <ABtn
                  behaviour="neumorphicHiddenOnCalm"
                  kind="flex"
                  propsWrapper={{
                    className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
                    style: {
                      marginLeft: "var(--spacePaddingBlock)",
                    },
                  }}
                  elements={[{ icon: EAIcons.menu }]}
                />
              }
            />
            <AFloatingPlatform
              content={"Menu2"}
              mode={EFloatingMode.Dialog}
              locationX={EClass.ArticleContent}
              arrowKind="beam"
              gapHeight={100}
              triggerElement={
                <ABtn
                  behaviour="neumorphicHiddenOnCalm"
                  kind="flex"
                  propsWrapper={{
                    className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
                    style: {
                      marginLeft: "calc(var(--spacePaddingBlock) / 2)",
                    },
                  }}
                  elements={[{ icon: EAIcons.menu }]}
                />
              }
            />
            <AFloatingPlatform
              content={"Menu2"}
              mode={EFloatingMode.Dialog}
              locationX={EClass.ArticleContent}
              arrowKind="beam"
              gapHeight={100}
              triggerElement={
                <ABtn
                  behaviour="neumorphicHiddenOnCalm"
                  kind="flex"
                  propsWrapper={{
                    className: cn(st.AMainNavbarItem, st.AMainNavbarItemStyle),
                    style: {
                      marginLeft: "100px",
                    },
                  }}
                  elements={[{ icon: EAIcons.menu }]}
                />
              }
            />
            разделы 1.10.32 и 1.10.33 "de Finibus Bonorum et Malorum" Цицерона и
            их английский перевод, сделанный H. Rackham, 1914 год. Где его
            взять? Есть много вариантов Lorem Ipsum, но большинство из них имеет
            не всегда приемлемые модификации, например, юмористические вставки
            или слова, которые даже отдалённо не напоминают латынь. Если вам
            нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите
            какой-нибудь шутки, скрытой в середине абзаца. Также все другие
            известные генераторы Lorem Ipsum используют один и тот же текст,
            который они просто повторяют, пока не достигнут нужный объём. Это
            делает предлагаемый здесь генератор единственным настоящим Lorem
            Ipsum генератором. Он использует словарь из более чем 200 латинских
            слов, а также набор моделей предложений. В результате
            сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет
            повторяющихся абзацей или "невозможных" слов.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
