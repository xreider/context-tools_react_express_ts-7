import { useEffect, useState } from "react";
import { getCssValue, getNumberFromString } from "utils";
import useCustomWindowInnerSize from "./useCustomWindowInnerSize";

interface PropsUseGetCssValueNum {
  enabled?: boolean;
}

export const useGetCssValueStr = (
  vars: string[],
  props: PropsUseGetCssValueNum = { enabled: true }
) => {
  let arr: string[] = [];
  vars.forEach((v) => {
    arr.push(getCssValue(v).trim());
  });
  return arr;
};

export const useGetCssValueNum = (
  variables: string[],
  props: PropsUseGetCssValueNum = { enabled: true }
) => {
  // const { width } = useCustomWindowInnerSize({});
  // useEffect(() => {
  //   setNumArr(() => getValues());
  //   console.log("1");
  // }, [width]);

  // const [numArr, setNumArr] = useState<number[]>([]);
  if (!props.enabled) return [0];

  function getValues() {
    let arr: number[] = [];
    variables.forEach((v) => {
      // console.log(vars, getCssValue(v));
      arr.push(getNumberFromString(getCssValue(v)));
    });
    return arr;
  }
  // console.log("1");
  return getValues();
};
