import mongoose, { ObjectId, Types } from "mongoose";
import bcrypt from "bcrypt";
import { PUserSharable } from "types/sharableWithClient/user";
import { genToken } from "utils/user";

export interface PUserSchema extends PUserSharable<Types.ObjectId> {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tokens?: { isNew?: { token?: string; expiredAt?: number } };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type PUserDocument = PUserSchema & mongoose.Document;

const userSchema = new mongoose.Schema<PUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    tokens: {
      isNew: {
        token: { type: String, select: false },
        expiredAt: { type: Number, select: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(<number>Number(process.env.SALT));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  let user = this;
  user.tokens = { isNew: genToken() };
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// const UserModel = mongoose.model<PUserDocument>("User", userSchema);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
