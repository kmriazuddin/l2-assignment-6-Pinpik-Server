import mongoose from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  images?: string[];
  videos?: string[];
  tags?: string[];
  category?: string;
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  voters: { userId: mongoose.Types.ObjectId; vote: number }[];
}
