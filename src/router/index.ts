import { Router } from "express";
import { userRoutes } from "../app/modules/user/user.route";
import { postRouter } from "../app/modules/post/post.routee";


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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
