import { getCssValue, getNumberFromString } from "utils";

export const useGetCssValueStr = (vars: string[]) => {
  let arr: string[] = [];
  vars.forEach((v) => {
    arr.push(getCssValue(v).trim());
  });
  return arr;
};

export const useGetCssValueNum = (vars: string[]) => {
  let arr: number[] = [];
  vars.forEach((v) => {
    // console.log(vars, getCssValue(v));
    arr.push(getNumberFromString(getCssValue(v)));
  });
  return arr;
};
