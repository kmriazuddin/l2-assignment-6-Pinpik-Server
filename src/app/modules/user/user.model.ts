import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.statics.isUserExistsByEmail = async function (
  email: string
): Promise<IUser | null> {
  return await this.findOne({ email });
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const bcrypt = require("bcrypt");
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, IUserModel>("User", UserSchema);
