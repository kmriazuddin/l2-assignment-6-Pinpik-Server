import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import appError from "../../middleware/appError";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import mongoose from "mongoose";

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate("author"), query)
    .filterByTitle()
    .sortByPopularity()
    .paginate();

  const posts = await postQuery.modelQuery;
  return posts;
};

const getSinglePostFromDB = async (postId: string): Promise<IPost | null> => {
  const post = await Post.findById(postId).populate("author");

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found!");
  }

  return post;
};

const updatePostIntoDB = async (postId: string, payload: Partial<IPost>) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found!");
  }

  Object.keys(payload).forEach((key) => {
    if (payload[key as keyof IPost] !== undefined) {
      post.set(key, payload[key as keyof IPost]);
    }
  });

  await post.save();
  return post;
};

const deletePostFromDB = async (postId: string) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found!");
  }

  await post.deleteOne();
};

const voteOnPost = async (
  postId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  vote: number
) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found!");
  }

  const existingVoteIndex = post.voters.findIndex(
    (voter) => voter.userId.toString() === userId.toString()
  );

  if (existingVoteIndex !== -1) {
    const existingVote = post.voters[existingVoteIndex].vote;

    if (existingVote === vote) {
      return post;
    }

    if (existingVote === 1 && vote === -1) {
      post.upvotes -= 1;
      post.downvotes += 1;
    } else if (existingVote === -1 && vote === 1) {
      post.downvotes -= 1;
      post.upvotes += 1;
    }

    post.voters[existingVoteIndex].vote = vote;
  } else {
    post.voters.push({ userId, vote });

    if (vote === 1) {
      post.upvotes += 1;
    } else if (vote === -1) {
      post.downvotes += 1;
    }
  }

  await post.save();

  return post;
};

const getPostsByUserIdFromDB = async (userId: string) => {
  const posts = await Post.find({ author: userId }).populate("author");
  return posts;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  voteOnPost,
  getPostsByUserIdFromDB,
};
