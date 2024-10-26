import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validation";
import { PostValidationSchema } from "./post.validation";
import { PostController } from "./post.controller";

const router = express.Router();

router.post(
  "/create-post",
  auth(USER_ROLE.user),
  validateRequest(PostValidationSchema.postSchema),
  PostController.createPost
);

router.get("/posts", PostController.getAllPosts);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.getSinglePost
);

router.put(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(PostValidationSchema.updatePostValidationSchema),
  PostController.updatePost
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostController.deletePost
);

router.post(
  "/:id/vote",
  auth(USER_ROLE.user),
  validateRequest(PostValidationSchema.voteValidation),
  PostController.votePost
);

router.get(
  "/user/:userId",
  auth(USER_ROLE.user),
  PostController.getPostByUserId
);

router.get(
  "/posts/all",
  auth(USER_ROLE.admin),
  PostController.getAllPostsWithPagination
);

router.get(
  "/upvotes/top-authors",
  auth(USER_ROLE.admin),
  PostController.getAuthorByUpvote
);

export const postRouter = router;
