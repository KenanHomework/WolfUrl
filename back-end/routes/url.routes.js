import express from "express";
import authJwt from "../middlewares/authJwt.js"
import {
    getUserLinks, shortLink, getLink
} from "../controllers/url.controller.js";

export const url = express.Router();
// url.use(authJwt.verifyToken);

url.post("/short", [authJwt.verifyToken], shortLink);
url.get("/", [authJwt.verifyToken], getUserLinks);
url.get("/:backHalf", getLink);
