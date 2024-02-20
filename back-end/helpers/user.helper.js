import { User } from "../models/user.model.js";

export async function getUser(id) {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    return null;
  }
}
