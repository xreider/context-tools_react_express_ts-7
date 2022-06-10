import { Request } from "express";
import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { PUserDocument } from "../../models/user.model";

export const saveUserSession = async (userId: any, req: Request) => {
  req.session.userId = userId;

  return await new Promise((resolve, reject) => {
    req.session.save(() => {
      return resolve("Ok");
    });
  });
};

export async function createUser(input: DocumentDefinition<PUserDocument>) {
  try {
    const candidate = await User.findOne({ email: input.email });
    if (candidate) {
      throw new Error("userAlreadyExists");
    }
    return await User.create(input);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email }).select("+password");
  //   console.log("user", user);
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<PUserDocument>) {
  return User.findOne(query).lean();
}
