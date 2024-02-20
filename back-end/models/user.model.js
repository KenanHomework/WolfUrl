import { createConnection } from "../connection.js";
import { Schema } from "mongoose";

const mongoose = await createConnection();

const UserScheme = mongoose.Schema(
  {
    username: {
      type: String,
      maxLength: [16, "Too long"],
      minLength: 3,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserScheme);
