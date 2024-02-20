import express from "express";
import verifySignUp from "../middlewares/verifySignUp.js";
import { signIn, signUp, logOut } from "../controllers/auth.controller.js";

export const auth = express.Router();

auth.post("/register", [verifySignUp.checkDuplicateUsernameOrEmail], signUp);

auth.post("/login", signIn);

auth.post("/logOut", logOut);
