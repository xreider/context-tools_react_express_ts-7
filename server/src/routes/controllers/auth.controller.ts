import { Request, Response } from "express";
import { omit } from "lodash";
import {
  createUser,
  findUser,
  validatePassword,
} from "routes/services/auth.service";
import { saveUserSession } from "routes/services/auth.service";
import { validationResult } from "express-validator";
import { TErrorsInFields } from "types/sharableWithClient/errors";

export const deleteUserSessionController = async (
  req: Request,
  res: Response
) => {
  req.session.destroy(function (err) {
    if (!err) {
      return res.sendStatus(204);
    } else {
      return res.status(500).send(err);
    }
  });
  //   return await new Promise((resolve, reject) => {
  //     req.session.save(() => {
  //     });
  //   });
};

export const getUserAuthController = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.send(JSON.stringify(undefined));
  }
  const currentUser = await findUser({ _id: req.session.userId });
  return res.send(
    omit(currentUser, [
      "password",
      "tokens",
      "email",
      "__v",
      "createdAt",
      "updatedAt",
    ])
  );
};

export const checkIfUserExistsByEmail = async (req: Request, res: Response) => {
  try {
    const candidate = await findUser({ email: req.body.email });
    if (candidate) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    console.error("checkIfUserExistsByEmail" + error);
    return res.status(409).send((error as Error).message);
  }
};

export const createUserAuthController = async (req: Request, res: Response) => {
  try {
    console.log("createUserHandler req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("createUserAuthController errors", errors.array());
      return res
        .status(400)
        .send({ errorsInFields: errors.array() } as TErrorsInFields);
    }

    const candidate = await createUser(req.body);
    const userId = candidate._id;
    await saveUserSession(userId, req);
    //  console.log(2);
    //  console.log("res", res.req.session.user);
    // const currentUser = await findUser({ _id: req.session.userId });
    // return res.send(omit(currentUser, "password"));
    return res.sendStatus(201);
  } catch (e) {
    console.error("createUserHandler" + e);
    return res.status(409).send((e as Error).message);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    //  console.log("loginUserController", req.body);

    const candidate = await validatePassword(req.body);
    //  console.log("loginUserController candidate", candidate);
    if (!candidate) {
      return res.status(401).json("Invalid email or password");
    }
    const userId = candidate._id;
    await saveUserSession(userId, req);
    // const currentUser = await findUser({ _id: req.session.userId });
    // return res.send(omit(currentUser, "password"));
    return res.sendStatus(204);
  } catch (e) {
    console.error("loginUserController" + e);
    return res.status(409).send((e as Error).message);
  }
};
