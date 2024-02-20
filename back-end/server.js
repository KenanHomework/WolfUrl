import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import { auth } from "./routes/auth.routes.js";
import { user } from "./routes/user.routes.js";
import { url } from "./routes/url.routes.js";

import { createConnection } from "./connection.js";
import cors from "cors";
const PORT = process.env.API_PORT || 8080;

var corsOptions = {
  origin: true,
  credentials: true,
};

const server = express();
server.use(cors(corsOptions));

server.use(json());

server.use(urlencoded({ extended: true }));

server.use(cookieParser());

server.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials"
  );
  next();
});

server.use("/api/auth", auth);
server.use("/api/users", user);
server.use("/api/url", url);

server.listen(PORT, async () => {
  await createConnection();
  console.log(`Server is running on port ${PORT}.`);
});
