import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
let { users } = db;

// sign up opertaion
export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
};

// check if a user with the same username already exists
export const findUserByUsername = (username) => users.find((user) => user.username === username);

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((user) => user._id === userId);

// log in operation 
export const findUserByCredentials = (username, password) =>
  users.find( (user) => user.username === username && user.password === password );

// update user info
export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));

export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));