import { z } from "zod";

const FollowerUserZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    followingId: z.string(),
  }),
});

export const FollowerValidation = {
  FollowerUserZodSchema,
};
