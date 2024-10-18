import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentService } from "./comment.service";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createCommentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Created Successfully!",
    data: result,
  });
});

const replayComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const replayData = {
    userId: new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id),
    comment: req.body.comment,
  };

  const result = await CommentService.replayCommentIntoDB(
    commentId,
    replayData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply Added Successfully!",
    data: result,
  });
});

const getCommentsPost = catchAsync(async (req, res) => {
  const { id: postId } = req.params;

  const result = await CommentService.getCommentsPostFromDB(postId);

  if (!result || result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "No Comments Found!",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments Retrieved Successfully!",
    data: result,
  });
});

const editeComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const updatedCommentData = req.body;
  const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id);

  const result = await CommentService.editeCommentDB(
    commentId,
    updatedCommentData,
    userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment Update Successfully!",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id);
  const { commentId } = req.params;

  const result = await CommentService.deleteCommentFromDB(commentId, userId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment Delete Successfully!",
    data: result,
  });
});

export const CommentController = {
  createComment,
  replayComment,
  getCommentsPost,
  editeComment,
  deleteComment,
};
