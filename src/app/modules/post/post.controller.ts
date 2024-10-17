import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Create Successfully!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts Retrieved Successfully!",
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const result = await PostServices.getSinglePostFromDB(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Post Retrieved Successfully!",
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const postData = req.body;

  const result = await PostServices.updatePostIntoDB(postId, postData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Updated Successfully!",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const postId = req.params.id;

  await PostServices.deletePostFromDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Deleted Successfully!",
  });
});

const votePost = catchAsync(async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);
  const { vote } = req.body;
  const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id);

  const result = await PostServices.voteOnPost(postId, userId, vote);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote Registered Successfully!",
    data: result,
  });
});

const getPostByUserId = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await PostServices.getPostsByUserIdFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts Retrieved Successfully!",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  votePost,
  getPostByUserId,
};
