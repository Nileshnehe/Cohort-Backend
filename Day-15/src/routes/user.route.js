const express = require('express');
const userController = require('../controller/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRouter = express.Router();

// @route POST /api/users/follow/:username
// @description follow a user
// @access Private
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

// @route POST /api/users/unfollow/:username
// @description unfollow a user
// @access Private
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController);

module.exports = userRouter;
