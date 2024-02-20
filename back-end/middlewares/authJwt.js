import jwt from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import { getUser } from "../helpers/user.helper.js";

const verifyToken = async (req, res, next) => {
  let tokenCookie = req.cookies.authToken;
  if (!tokenCookie) {
    res.status(401).send({ message: "No token provided!" });
    return;
  }

  try {
    const decoded = jwt.verify(tokenCookie, secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });

    const user = await getUser(decoded.id);

    if (!user) throw new Error("User deleted!");

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
};

const authJwt = {
  verifyToken,
};
export default authJwt;
