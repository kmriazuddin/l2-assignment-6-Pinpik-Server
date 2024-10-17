import express from "express";
import validateRequest from "../../middleware/validation";
import { userValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.userSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(userValidationSchema.loginSchema),
  UserController.loginUser
);

router.put(
  "/user/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidationSchema.updateUserProfileSchema),
  UserController.updateUserProfile
);

export const userRoutes = router;
