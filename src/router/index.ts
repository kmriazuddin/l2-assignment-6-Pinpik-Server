import { Router } from "express";
import { userRoutes } from "../app/modules/user/user.route";
import { postRouter } from "../app/modules/post/post.routee";
import { commentRouter } from "../app/modules/comment/comment.route";
import { uploadImageRoute } from "../app/modules/image/upload.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/",
    route: commentRouter,
  },
  {
    path: "/",
    route: uploadImageRoute
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
