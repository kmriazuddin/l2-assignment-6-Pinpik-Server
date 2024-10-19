import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { FavoriteService } from "./favorite.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";

const addFavoritePost = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as JwtPayload).id;
  const postId = req.body.postId;

  const result = await FavoriteService.addFavoritePost(userId, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Favorites successfully!",
    data: result,
  });
});

const getFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  const favorites = await FavoriteService.getFavoritePostId(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Favorite Data Retrieved Successfully!",
    data: favorites,
  });
});

const deleteFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as JwtPayload).id;
  const postId = req.body.postId;

  const result = await FavoriteService.deleteFavoritePost(userId, postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Removed Successfully!",
    data: result,
  });
});

export const FavoriteController = {
  addFavoritePost,
  getFavorite,
  deleteFavorite
};
