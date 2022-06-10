import { ValidationError } from "express-validator";

export interface TErrorsInFields {
  errorsInFields: ValidationError[];
}
