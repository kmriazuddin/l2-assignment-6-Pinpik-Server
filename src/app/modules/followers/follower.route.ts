import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validation";
import { FollowerValidation } from "./follower.validation";
import { followerController } from "./follower.controller";

const router = Router();

router.post(
  "/follow",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(FollowerValidation.FollowerUserZodSchema),
  followerController.createFollow
);

router.get(
  "/followers/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  followerController.getFollower
);

router.get(
  "/following/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  followerController.getUserFollowing
);

router.put(
  "/unfollow",
  auth(USER_ROLE.admin, USER_ROLE.user),
  followerController.unfollow
);

export const followerRoute = router;
