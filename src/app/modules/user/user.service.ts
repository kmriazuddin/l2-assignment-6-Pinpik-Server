import httpStatus from "http-status";
import appError from "../../middleware/appError";
import { ILoginUser, IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { createToken } from "../../utils/authToken";

const createUserIntoDB = async (payload: IUser) => {
  const result = User.create(payload);
  return result;
};

const loginUserIntoDB = async (loginData: ILoginUser) => {
  const user = await User.isUserExistsByEmail(loginData.email);
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const passwordMatch = await User.isPasswordMatched(
    loginData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new appError(httpStatus.FORBIDDEN, "Password dose not match!");
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    avatar: user.avatar,
    isPremium: user.isPremium,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const result = await User.findOne({ email: user.email }).select("-password");

  return { accessToken, result };
};

const updateUserIntoDB = async (userId: string, payload: Partial<IUser>) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  user.set(payload);
  await user.save();

  const updateUser = await User.findById(userId).select("-password");

  return updateUser;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  updateUserIntoDB
};
