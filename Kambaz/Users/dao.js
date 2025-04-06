import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
}

export const findAllUsers = () => model.find();

export const findUsersByRole = (role) => model.find({ role: role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const findUserById = (userId) => model.findById(userId); // retrieves a user by its primary key

export const deleteUser = (userId) => model.deleteOne({ _id: userId }); // delete user from db collection

export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user }); // identify with id

export const findUserByUsername = (username) =>  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
