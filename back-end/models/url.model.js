import { createConnection } from "../connection.js";
import { Schema } from "mongoose";

const mongoose = await createConnection();

const UrlScheme = mongoose.Schema(
  {
    label: String,
    backHalf: String,
    destination: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", UrlScheme);