import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validation";
import { CommentSchemaValidation } from "./comment.validation";
import { CommentController } from "./comment.controller";

const router = express.Router();

router.post(
  "/post/:id/comment",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(CommentSchemaValidation.commentSchemaZod),
  CommentController.createComment
);

router.post(
  "/post/:id/comment/:commentId/replay",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(CommentSchemaValidation.replaySchemaZod),
  CommentController.replayComment
);

router.get(
  "/post/:id/comments",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentController.getCommentsPost
);

router.put(
  "/post/:id/comment/:commentId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentController.editeComment
);

router.delete(
  "/post/:id/comment/:commentId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentController.deleteComment
);

export const commentRouter = router;
