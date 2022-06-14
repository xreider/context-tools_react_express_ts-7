export const getNumberFromString = (x: string): number => {
  // console.log("getNumberFromString x", x);

  // console.log("getNumberFromString x", x);

  // for calc(  39px +  13px * 2) strings
  let mayBeCanCalculate = eval(
    x
      .replaceAll("px", "")
      .replaceAll("calc(", "")
      .replaceAll(")", "")
      .replaceAll("ms", "")
      .replaceAll("s", "")
  );

  if (typeof mayBeCanCalculate === "number") {
    return mayBeCanCalculate;
  }
  if (typeof x === "string" && x.length > 0) {
    // return parseFloat(x.match(/\d+/g)?.join("") || "") || 0;

    x = x.replace(/[^\d,.-]/g, ""); // strip everything except numbers, dots, commas and negative sign
    if (
      navigator.language.substring(0, 2) !== "de" &&
      /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(x)
    ) {
      // if not in German locale and matches #,###.######
      x = x.replace(/,/g, ""); // strip out commas
      return parseFloat(x); // convert to number
    } else if (/^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(x)) {
      // either in German locale or not match #,###.###### and now matches #.###,########
      x = x.replace(/\./g, ""); // strip out dots
      x = x.replace(/,/g, "."); // replace comma with dot
      return parseFloat(x);
    } // try #,###.###### anyway
    else {
      x = x.replace(/,/g, ""); // strip out commas
      return parseFloat(x); // convert to number
    }
  }
  return 0;
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getCssValue(v: string) {
  return (
    window.getComputedStyle(document.documentElement).getPropertyValue(v) ||
    window.getComputedStyle(document.body).getPropertyValue(v)
  );
}

export function getInputType(str: string) {
  const strng = str.toLowerCase();
  if (strng.indexOf("email") !== -1) {
    return "email";
  } else if (strng.indexOf("password") !== -1) {
    return "password";
  } else {
    return "text";
  }
}
