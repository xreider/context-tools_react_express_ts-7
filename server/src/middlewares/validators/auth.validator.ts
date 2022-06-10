import { check, CustomSanitizer, CustomValidator } from "express-validator";
import {
  countOcurrences,
  genNameError,
  leftRightTrim,
  nameMaxLength,
} from "utils/validators";
var isChinese = require("is-chinese");
// https://github.com/express-validator/express-validator/blob/master/src/chain/validators.ts
// https://github.com/express-validator/express-validator/blob/master/src/chain/sanitizers.ts
const { pinyin } = require("pinyin-pro");

export const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Incorrect email")
    .trim()
    .normalizeEmail(),
];

export const signupValidator = [
  check("firstName")
    .isString()
    .isLength({ min: 1, max: nameMaxLength })
    .withMessage(genNameError("Firstname"))
    .trim()
    .ltrim(leftRightTrim)
    .rtrim(leftRightTrim)
    .custom((input, meta) => {
      console.log("input", input);
      console.log("isChinese", isChinese(input));
      if (isChinese(input)) {
        const initialLength = input.length;
        const filteredLength = pinyin(input, {
          pattern: "num",
          type: "array",
          removeNonZh: true,
          mode: "surname",
        }).length;

        console.log(initialLength);
        console.log(filteredLength);

        if (initialLength !== filteredLength) {
          return Promise.reject(genNameError("Firstname"));
        }
      }
      // console.log(
      //   "/^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)",
      //   /^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)
      // );

      if (!/^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)) {
        return Promise.reject(genNameError("Firstname"));
      }

      // if (/^[a-zA-Z '.-]*$/gi.test(input) && /^[а-яА-Я '.-]*$/gi.test(input)) {
      //   return Promise.reject(genNameError("Firstname"));
      // }

      if (
        countOcurrences(input, " ") > 1 ||
        countOcurrences(input, "'") > 1 ||
        countOcurrences(input, ".") > 1 ||
        countOcurrences(input, "-") > 1
      ) {
        return Promise.reject(genNameError("Firstname"));
      }

      return true;
    }),
  check("lastName")
    .isString()
    .isLength({ min: 1, max: nameMaxLength })
    .withMessage(genNameError("Lastname"))
    .trim()
    .ltrim(leftRightTrim)
    .rtrim(leftRightTrim)
    .custom((input, meta) => {
      console.log("input", input);
      console.log("isChinese", isChinese(input));
      if (isChinese(input)) {
        const initialLength = input.length;
        const filteredLength = pinyin(input, {
          pattern: "num",
          type: "array",
          removeNonZh: true,
          mode: "surname",
        }).length;

        // console.log(initialLength);
        // console.log(filteredLength);

        if (initialLength !== filteredLength) {
          return Promise.reject(genNameError("Lastname"));
        }
      }
      // console.log(
      //   "/^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)",
      //   /^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)
      // );

      if (!/^[a-zA-Zа-яА-Я '.-]*$/gi.test(input)) {
        return Promise.reject(genNameError("Lastname"));
      }

      if (/^[a-zA-Z '.-]*$/gi.test(input) && /^[а-яА-Я '.-]*$/gi.test(input)) {
        return Promise.reject(genNameError("Lastname"));
      }

      if (
        countOcurrences(input, " ") > 1 ||
        countOcurrences(input, "'") > 1 ||
        countOcurrences(input, ".") > 1 ||
        countOcurrences(input, "-") > 1
      ) {
        return Promise.reject(genNameError("Lastname"));
      }

      return true;
    }),

  ...emailValidator,

  check("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password should be 8-32 chars long"),

  check("agreements").isBoolean().equals("true").withMessage("required_field"),

  check("remainLoggedIn").isBoolean().toBoolean(),
];

// checkSchema({
//   password: {
//     isLength: {
//       errorMessage: "Password should be 8-32 chars long",
//       options: { min: 8, max: 33 },
//     },
//   },
//   email: {
//     isEmail: {
//       bail: true,
//     },
//     normalizeEmail: true,
//     trim: true,
//   },
//   firstName: {
//     isString: true,
//     isUppercase: {
//       // To negate a validator
//       negated: true,
//     },
//     isLength: {
//       errorMessage: "Firstname should be 1-32 chars long",
//       options: { min: 1, max: 33 },
//     },
//     trim: true,
//     rtrim: { options: " -0123456789_" },
//     ltrim: { options: " -0123456789_" },
//     //  rtrim: {
//     //    // Options as an array
//     //    options: [[" ", "-"]],
//     //  },

//     custom: (value: CustomValidator) => {
//       return 0;
//     },
//   },
//   lastName: {
//     isString: true,
//     isUppercase: {
//       // To negate a validator
//       negated: true,
//     },
//     isLength: {
//       errorMessage: "Lastname should be 1-32 chars long",
//       options: { min: 1, max: 33 },
//     },
//     trim: true,
//     rtrim: { options: " -0123456789_" },
//     ltrim: { options: " -0123456789_" },

//     custom: (value: CustomValidator) => {
//       return 0;
//     },
//   },
//   agreements: {
//     in: ["true"],
//     errorMessage: "Should be true",
//     toBoolean: true,
//     isBoolean: true,
//   },
//   remainLoggedIn: {
//     toBoolean: true,
//     isBoolean: true,
//   },
// });
