import mongoose from "mongoose";
import { z } from "zod";

const replaySchemaZod = z.object({
  body: z.object({
    comment: z.string().min(1, { message: "Comment content is required" }),
  }),
});

const commentSchemaZod = z.object({
  body: z.object({
    postId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid Post ID",
    }),
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid User ID",
    }),
    comment: z.string().min(1, { message: "Comment content is required" }),
    replies: z.array(replaySchemaZod).optional(),
  }),
});

const updateSchemaZod = z.object({
  body: z.object({
    postId: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid Post ID",
      })
      .optional(),
    userId: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid User ID",
      })
      .optional(),
    comment: z.string().min(1, { message: "Comment content is required" }),
    replies: z.array(replaySchemaZod).optional(),
  }),
});

export const CommentSchemaValidation = {
  replaySchemaZod,
  commentSchemaZod,
  updateSchemaZod,
};
