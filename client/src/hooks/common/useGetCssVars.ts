import { getCssValue, getNumberFromString } from "utils";

export const useGetCssValueStr = (vars: string[]) => {
  let arr: string[] = [];
  vars.forEach((v) => {
    arr.push(getCssValue(v).trim());
  });
  return arr;
};

interface PropsUseGetCssValueNum {
  enabled?: boolean;
}

export const useGetCssValueNum = (
  variables: string[],
  props: PropsUseGetCssValueNum = { enabled: true }
) => {
  if (!props.enabled) return [0];

  let arr: number[] = [];
  variables.forEach((v) => {
    // console.log(vars, getCssValue(v));
    arr.push(getNumberFromString(getCssValue(v)));
  });
  return arr;
};
