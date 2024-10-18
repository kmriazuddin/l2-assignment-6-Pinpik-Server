import mongoose from "mongoose";
import { IComment, IReplay } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: IComment) => {
  const result = await Comment.create(payload);
  return result;
};

const replayCommentIntoDB = async (commentId: string, replayData: IReplay) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment Not Found!");
  }

  comment.replies.push(replayData);
  const result = await comment.save();

  return result;
};

const getCommentsPostFromDB = async (postId: string) => {
  const comments = await Comment.find({ postId }).populate("userId");
  return comments;
};

const editeCommentDB = async (
  commentId: string,
  updateCommentData: Partial<IComment>,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment Not Found!");
  }

  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("You Are Not Authorized!");
  }

  comment.comment = updateCommentData.comment || comment.comment;

  const result = await comment.save();
  return result;
};

const deleteCommentFromDB = async (
  commentId: string,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment Not Found!");
  }

  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("You Are Not Authorized!");
  }

  await comment.deleteOne();
  return { message: "Comment Delete Successfully!" };
};

export const CommentService = {
  createCommentIntoDB,
  replayCommentIntoDB,
  getCommentsPostFromDB,
  editeCommentDB,
  deleteCommentFromDB,
};
