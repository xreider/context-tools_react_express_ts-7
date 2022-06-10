export const genNameError = (str?: string) => {
  return "nameShould";
  // return `${str} should contain Chinese characters only or Latin/Cyrillic symbols with an optional dash, space, ' or .`;
};

export function countOcurrences(str: string, value: string) {
  // console.log("countOcurrences", str, value);
  var regExp = new RegExp(value === "." ? /\./ : value, "gi");
  return str.match(regExp) ? str.match(regExp)?.length || 0 : 0;
}

export const leftRightTrim = "-_ 0123456789'.";

export const nameMaxLength = 22;
