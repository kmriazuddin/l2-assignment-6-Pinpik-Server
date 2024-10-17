import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is Required!").trim(),
    email: z
      .string()
      .email("Invalid Email!")
      .min(1, "Email is required!")
      .transform((email) => email.toLowerCase().trim()),
    password: z.string().min(6, "Password Must be 6 characters!"),
    role: z.enum(["user", "admin"]).optional(),
    avatar: z.string().url("Avatar must valid URL!").optional(),
    isPremium: z.boolean().optional().default(false),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid Email!")
      .min(1, "Email is Required!")
      .transform((email) => email.toLowerCase().trim()),
    password: z.string().min(6, "Password Must be 6 characters!"),
  }),
});

const updateUserProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required!").optional(),
    email: z.string().email("Invalid email").optional(),
    avatar: z.string().url("Avatar must valid URL!").optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const userValidationSchema = {
  userSchema,
  loginSchema,
  updateUserProfileSchema,
};
