import mongoose from "mongoose";

export interface IReplay {
  userId: mongoose.Types.ObjectId;
  comment: string;
}

export interface IComment {
  postId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  comment: string;
  replies: IReplay[];
}
