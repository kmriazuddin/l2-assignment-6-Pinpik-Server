import mongoose from "mongoose";
import { z } from "zod";

export const favoriteZodValidation = z.object({
  body: z.object({
    userId: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid userId format",
      })
      .optional(),
    postId: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid postId format",
      }),
  }),
});
