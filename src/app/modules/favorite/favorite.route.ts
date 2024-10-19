import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validation";
import { favoriteZodValidation } from "./favorite.valodation";
import { FavoriteController } from "./favorite.controller";

const router = Router();

router.post(
  "/favorite",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(favoriteZodValidation),
  FavoriteController.addFavoritePost
);

router.get(
  "favorite/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  FavoriteController.getFavorite
);

router.delete(
  "/favorite/:postId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  FavoriteController.deleteFavorite
);

export const favoriteRoute = router;
