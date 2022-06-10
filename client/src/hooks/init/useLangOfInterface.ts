import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
import Cookies from "js-cookie";
import { EInterfaceLanguages } from "constants/common/languages";

type TNavigator = Navigator & { userLanguage: string };

// export type TLangInterface = keyof typeof LangsInterface;
// export const availableLangsInterface = ["en", "zh", "ru"];
// export const availableLangsContent = ["en", "ru"];
export const getLangFromShortcut = (lang: string) => {
  switch (lang) {
    case EInterfaceLanguages.zh:
      return "中文";
    case EInterfaceLanguages.ru:
      return "Русский";
    default:
      return "Русский";
  }
};

i18n
  // .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: () => {
      // localStorage.setItem("i18nReady", "false");
      let value = Cookies.get("currentLangOfInterface") as EInterfaceLanguages;
      let flagIsNoInitialLangInterfaceCookie = false;

      // if (value && availableLangsInterface.includes(value)) {
      //   Cookies.set("currentLangOfInterface", value);
      // }

      // No initial lang interface cookie
      if (!value || !Object.values(EInterfaceLanguages).includes(value)) {
        // Check browser
        const navigatorLang =
          (navigator.language as EInterfaceLanguages) ||
          (navigator as TNavigator).userLanguage;

        // Set browser lang as lang of interface
        value = navigatorLang;

        // Set no initial lang of interface flag to true
        flagIsNoInitialLangInterfaceCookie = true;
      }

      if (typeof value === "string") {
        if (value.startsWith("zh")) {
          // Chinese language
          value = EInterfaceLanguages.zh;
        } else if (
          value.startsWith("ru") ||
          value.startsWith("be") ||
          value.startsWith("uk")
        ) {
          // Slavic languages
          value = EInterfaceLanguages.ru;
        } else {
          // Default language
          value = EInterfaceLanguages.ru;
        }
      } else {
        // Default language
        value = EInterfaceLanguages.ru;
      }

      // console.log("value", value);

      // Check if in availableLangsInterface and set default lang is
      if (!Object.values(EInterfaceLanguages).includes(value)) {
        // console.log("!availableLangsInterface.includes(value)");

        // Set no initial lang of interface flag to true
        flagIsNoInitialLangInterfaceCookie = true;

        // Default language
        value = EInterfaceLanguages.ru;
      }

      // If no initial lang of interface cookie, then set it
      if (flagIsNoInitialLangInterfaceCookie) {
        Cookies.set("currentLangOfInterface", value);
      }

      // localStorage.setItem("i18nReady", "true");
      return value;
    },

    debug: false,

    // interpolation: { escapeValue: false },

    backend: {
      loadPath: "/locales/{{lng}}.json",
    },

    // react: {
    //   useSuspense: false,
    // },
  });

export default i18n;

i18n.on("languageChanged", function (lng: EInterfaceLanguages) {
  // let body = document.body;

  // availableLangsInterface.forEach((lang) => {
  //   // document.body.classList.remove(
  //   //   `languageInterface${capitalizeFirstLetter(lang)}`
  //   // );

  //   document.body.dataset.languageInterface = lang
  // });

  // document.body.classList.add(`languageInterface${capitalizeFirstLetter(lng)}`);

  document.body.dataset.languageInterface = lng;

  // console.log(
  //   "availableLangsInterface.includes(lng)",
  //   availableLangsInterface.includes(lng)
  // );

  if (Object.values(EInterfaceLanguages).includes(lng)) {
    Cookies.set("currentLangOfInterface", lng);
    document.body.dataset.languageInterface = lng;
  } else {
    Cookies.remove("currentLangOfInterface");
    document.body.dataset.languageInterface = EInterfaceLanguages.ru;
    setTimeout(() => {
      window && window.location && window.location.reload();
    }, 1000);
  }
});

// i18n.on("initialized", function () {
//   console.log('localStorage.setItem("i18nReady", "true");');

//   localStorage.setItem("i18nReady", "true");
// });

// // TODO
// function reduceLanguage(lang) {

// }
