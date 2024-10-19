import mongoose, { Schema } from "mongoose";
import { IFavorite } from "./favorite.interface";

const FavoriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  ],
});

export const Favorite = mongoose.model<IFavorite>("favorite", FavoriteSchema);
