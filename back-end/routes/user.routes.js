import express from "express";
import authJwt from "../middlewares/authJwt.js";
import {
  getUser, getCurrentUser
} from "../controllers/user.controller.js";

export const user = express.Router();
user.use(authJwt.verifyToken);

user.get("/:id", getUser);
user.get("/me", getCurrentUser);
