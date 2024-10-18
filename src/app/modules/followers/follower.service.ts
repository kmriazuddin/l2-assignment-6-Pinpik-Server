import httpStatus from "http-status";
import appError from "../../middleware/appError";
import { Follower } from "./follower.model";

const followUser = async (userId: string, followingId: string) => {
  let userFollowers = await Follower.findOne({ userId });

  if (!userFollowers) {
    userFollowers = await Follower.create({
      userId,
      following: [followingId],
    });
  } else {
    if (userFollowers.following.includes(followingId)) {
      throw new appError(httpStatus.BAD_REQUEST, "Already following this user");
    }

    userFollowers.following.push(followingId);
    await userFollowers.save();
  }

  return userFollowers;
};

const getFollower = async (userId: string) => {
  try {
    const followers = await Follower.find({ following: userId })
      .select("userId")
      .populate({ path: "userId", model: "User", select: "name email" });
    return followers;
  } catch (error) {
    throw new Error("Could not retrieve followers");
  }
};

const getFollowing = async (userId: string) => {
  try {
    const user = await Follower.findOne({ userId })
      .select("following")
      .populate({ path: "following", model: "User", select: "name email" });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.following;
  } catch (error) {
    throw new Error("Could not retrieve!");
  }
};

export const FollowerService = {
  followUser,
  getFollower,
  getFollowing,
};
