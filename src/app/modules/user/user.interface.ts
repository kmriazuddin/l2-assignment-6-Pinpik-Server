import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  isPremium: boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
