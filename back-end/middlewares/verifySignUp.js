import { User } from "../models/user.model.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user_email = await User.findOne({
    email: req.body.email,
  });

  if (user_email) {
    res.status(400).send({ message: "Failed! Email is already in use!" });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
