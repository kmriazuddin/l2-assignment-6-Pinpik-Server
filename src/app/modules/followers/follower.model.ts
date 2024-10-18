import { model, Schema } from "mongoose";
import { IUserFollower } from "./follower.interface";

const FollowerUserSchema = new Schema<IUserFollower>({
  userId: { type: String, required: true, unique: true },
  following: [{ type: String, required: true }],
});

export const Follower = model<IUserFollower>("Follower", FollowerUserSchema);
