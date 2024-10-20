import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowerService } from "./follower.service";

const createFollow = catchAsync(async (req, res) => {
  const { userId, followingId } = req.body;

  const result = await FollowerService.followUser(userId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Followed Successfully!",
    data: result,
  });
});

const getFollower = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await FollowerService.getFollower(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Followers Retrieved Successfully!",
    data: result,
  });
});

const getUserFollowing = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await FollowerService.getFollowing(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Following Retrieved Successfully!",
    data: result,
  });
});

const unfollow = catchAsync(async (req, res) => {
  const { userId, followingId } = req.body;

  const result = await FollowerService.unfollowUser(userId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User unfollowed successfully.",
    data: result,
  });
});

export const followerController = {
  createFollow,
  getFollower,
  getUserFollowing,
  unfollow
};
