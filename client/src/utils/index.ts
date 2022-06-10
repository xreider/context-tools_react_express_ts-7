export const getNumberFromString = (x: string): number => {
  if (typeof x === "string" && x.length > 0) {
    return parseFloat(x.match(/\d+/g)?.join("") || "") || 0;
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
