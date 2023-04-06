import Userr from "../models/userr.model.js";

export const deleteUser = async (req, res, next) => {
  await Userr.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted!");
};

export const updateTrungThuong = async (req, res, next) => {
  await Userr.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        trungthuong: true,
      },
    }
  ),
    res.status(200).send("updated!");
};
export const updateTrungThuongFalse = async (req, res, next) => {
  await Userr.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        trungthuong: false,
      },
    }
  ),
    res.status(200).send("updated!");
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await Userr.find();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const newUser = new Userr({
      ...req.body,
    });
    await newUser.save();
    res.status(201).send("add user success");
  } catch (error) {
    next(error);
  }
};
