import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    //check user 
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found..."));
    //check password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username ..."));

    // token để phân biệt user
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    ); // secret key trong file env

    const { _id, isSeller, img, username } = user._doc;

    // gửi 1 cookie lúc login
    res
      .cookie("accessToken", token, {
        path: '/',
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
        httpOnly: true,      // cookie nay chi đc truy cap boi server
        sameSite: 'lax'
      })
      .status(200)
      .send({ _id, isSeller, img,username });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none", //  server api và cline ko cùng site để dùng cookies
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};
