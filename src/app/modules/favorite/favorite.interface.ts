import mongoose from "mongoose";

export interface IFavorite {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId[];
}
