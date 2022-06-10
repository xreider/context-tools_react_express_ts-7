import { Request, Response, NextFunction } from "express";

export const forAuthed = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    // console.log("auth middleware: you need to authenticate first");
    return res.status(401).send("needToBeAuthenticatedToDoIt");
  } else {
    // console.log("auth middleware: OK, you authenticated");
    next();
  }
};

export const forNotAuthed = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // return res.status(409).send("cannotBeAuthenticatedToDoIt");
  if (req.session.userId) {
    return res.status(409).send("cannotBeAuthenticatedToDoIt");
  } else {
    // console.log("notAuth middleware: OK, you are not authenticated");
    next();
  }
};
