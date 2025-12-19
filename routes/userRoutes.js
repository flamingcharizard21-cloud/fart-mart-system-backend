const express = require("express");
const userRouter = express.Router();
const userController = require("./../controller/userController");
userRouter.route("/get").get(userController.getAllUsers);
userRouter.route("/login").post(userController.login);
userRouter.route("/register").post(userController.register);
module.exports = userRouter;
