import mongoose, { model, Schema } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    tags: [{ type: String }],
    category: { type: String },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    voters: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        vote: { type: Number, enum: [1, -1] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", PostSchema);
