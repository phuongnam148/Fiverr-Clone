import Userr from "../models/userr.model.js";

export const deleteUser = async (req, res, next) => {
  await Userr.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted!");
};

export const getUsers = async (req, res, next) => {
  const user = await Userr.findById(req.params.id);
  res.status(200).send(user);
};

export const addUser = async (req, res, next) => {
  try {
    const newUser = new Userr({
      ...req.body,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    next(error);
  }
};
