import { User } from "../models/user.model.js";

export async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id }, "username email");

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.userId }, "username email");

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}
