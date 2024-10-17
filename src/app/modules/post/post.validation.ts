import mongoose from "mongoose";
import { z } from "zod";

const postSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid author ID",
    }),
    images: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    upvotes: z.number().min(0),
    downvotes: z.number().min(0),
    isPremium: z.boolean(),
    voters: z.array(
      z.object({
        userId: z
          .string()
          .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid user ID",
          }),
        vote: z.number().refine((val) => val === 1 || val === -1, {
          message: "Vote must be 1 (upvote) or -1 (downvote)",
        }),
      })
    ),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().min(1, "Content is required").optional(),
    author: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid author ID",
      })
      .optional(),
    images: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    upvotes: z.number().min(0).optional(),
    downvotes: z.number().min(0).optional(),
    isPremium: z.boolean().optional(),
    voters: z
      .array(
        z.object({
          userId: z
            .string()
            .refine((val) => mongoose.Types.ObjectId.isValid(val), {
              message: "Invalid user ID",
            }),
          vote: z.number().refine((val) => val === 1 || val === -1, {
            message: "Vote must be 1 (upvote) or -1 (downvote)",
          }),
        })
      )
      .optional(),
  }),
});

const voteValidation = z.object({
  body: z.object({
    vote: z.number().refine((val) => val === 1 || val === -1, {
      message: "Vote must be 1 (upvote) or -1 (downvote)",
    }),
  }),
});

export const PostValidationSchema = {
  postSchema,
  updatePostValidationSchema,
  voteValidation,
};
