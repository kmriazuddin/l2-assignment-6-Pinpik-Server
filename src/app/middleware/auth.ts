import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import appError from "./appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "You Are Not Authorized!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { id, role, email } = decoded;
    if (!id) {
      return next(new appError(httpStatus.UNAUTHORIZED, "Invalid Token!"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new appError(httpStatus.NOT_FOUND, "User Not Found!"));
    }

    req.user = decoded as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(
        new appError(httpStatus.UNAUTHORIZED, "You are not authorized!")
      );
    }
    next();
  });
};

export default auth;
