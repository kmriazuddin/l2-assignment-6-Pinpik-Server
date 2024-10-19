import httpStatus from "http-status";
import appError from "../../middleware/appError";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import { Favorite } from "./favorite.model";
import mongoose from "mongoose";

const addFavoritePost = async (userId: string, postId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const postExists = await Post.findById(postId);

  if (!postExists) {
    throw new appError(httpStatus.NOT_FOUND, "Post Not Found!");
  }

  let favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    favorite = new Favorite({ userId, postId: [] });
  }

  const isFavorite = favorite.postId.includes(
    new mongoose.Types.ObjectId(postId)
  );

  if (isFavorite) {
    throw new appError(httpStatus.BAD_REQUEST, "Post Already Favorites!");
  }

  favorite.postId.push(new mongoose.Types.ObjectId(postId));
  await favorite.save();

  return favorite;
};

const getFavoritePostId = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new appError(400, "Invalid User ID!");
  }
  const favorite = await Favorite.findOne({ userId }).populate("postId");

  if (!favorite) {
    throw new appError(404, "No Data found!");
  }

  return favorite.postId;
};

const deleteFavoritePost = async (userId: string, postId: string) => {
  const favorite = await Favorite.findOne({ userId });
  if (!favorite) {
    throw new appError(httpStatus.NOT_FOUND, "User Data Not Found!");
  }

  favorite.postId = favorite.postId.filter(
    (favoriteId) => favoriteId.toString() !== postId
  );

  await favorite.save();

  return favorite;
};

export const FavoriteService = {
  addFavoritePost,
  getFavoritePostId,
  deleteFavoritePost,
};
