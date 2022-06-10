import { cloneElement, FC, PropsWithoutRef } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import * as i from "./icons";

export enum EAIcons {
  arrowRight = "arrowRight",
  bell = "bell",
  logoCircle = "logoCircle",
  logoTight = "logoTight",
  logoWide = "logoWide",
  check = "check",
  checkSolid = "checkSolid",
  color = "color",
  comment = "comment",
  cross = "cross",
  erase = "erase",
  error = "error",
  eye = "eye",
  eyeOff = "eyeOff",
  key = "key",
  fakeLogo = "fakeLogo",
  fakeLogoTight = "fakeLogoTight",
  language = "language",
  loading = "loading",
  login = "login",
  logout = "logout",
  manualInput = "manualInput",
  menu = "menu",
  handSparkles = "handSparkles",
  search = "search",
  sendMail = "sendMail",
  signup = "signup",
  user = "user",
}

export interface PAIcon extends PropsWithoutRef<JSX.IntrinsicElements["svg"]> {
  icon: EAIcons;
}

const AIcon: FC<PAIcon> = ({ icon, style, className, onClick }) => {
  const elem = getIcon(icon);
  let el = cloneElement(elem, {
    style: style,
    className: classNames(elem?.props?.className, styles.wrapper, className),
    onClick,
  });

  return el;
};

export default AIcon;

function getIcon(icon: EAIcons) {
  switch (icon) {
    //   case EAIcons.arrowRight:
    //     return <ArrowRight />;
    case EAIcons.bell:
      return <i.Bell />;
    case EAIcons.logoCircle:
      return <i.LogoCircle />;
    case EAIcons.logoTight:
      return <i.LogoTight />;
    case EAIcons.logoWide:
      return <i.LogoWide />;
    //   case EAIcons.check:
    //     return <CheckSvg />;
    //   case EAIcons.checkSolid:
    //     return <CheckSolidSvg />;
    //   case EAIcons.color:
    //     return <ColorSvg />;
    case EAIcons.comment:
      return <i.Comment />;
    case EAIcons.cross:
      return <i.Cross />;
    case EAIcons.erase:
      return <i.Erase />;
    case EAIcons.fakeLogo:
      return <i.FakeLogo />;
    case EAIcons.fakeLogoTight:
      return <i.FakeLogoTight />;
    // case EAIcons.error:
    //   return <i.Error />;
    //   case EAIcons.eye:
    //     return <Eye />;
    //   case EAIcons.eyeOff:
    //     return <EyeOff />;
    //   case EAIcons.key:
    //     return <KeySvg />;
    // case EAIcons.language:
    //   return <i.Language />;
    // case EAIcons.loading:
    //   return <i.Loader />;
    // return <飞镖刀 className={styles.rot} />;
    // case EAIcons.login:
    //   return <i.Login />;
    // case EAIcons.logout:
    //   return <i.Logout />;
    case EAIcons.manualInput:
      return <i.ManualInput />;
    case EAIcons.menu:
      return <i.Menu />;
    //   case EAIcons.handSparkles:
    //     return <HandSparkles />;
    case EAIcons.search:
      return <i.Search />;
    // case EAIcons.sendMail:
    //   return <i.SendMail />;
    // case EAIcons.signup:
    //   return <i.Signup />;
    //   case EAIcons.user:
    //     return <LoginSvg />;
    default:
      return <i.Cross />;
  }
}
