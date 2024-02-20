import { User } from "../models/user.model.js";
import { secret } from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";

export async function signUp(req, res) {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashSync(req.body.password, 8),
    });

    const saved = await user.save();

    const token = jwt.sign({ id: saved.id }, secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h",
    });

    res.cookie("authToken", token, {
      expires: req.body.rememberMe
        ? new Date(Date.now() + 24 * 60 * 60 * 1000)
        : 0,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send({
        id: saved._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function signIn(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h",
    });

    res.cookie("authToken", token, {
      expires: req.body.rememberMe
        ? new Date(Date.now() + 24 * 60 * 60 * 1000)
        : 0,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export function logOut(req, res) {
  res.clearCookie("authToken");
  res.status(200).json("success");
}
