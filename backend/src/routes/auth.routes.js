const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/blacklist.model"); 
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register', authController.registerUserController);
/**
 * @route POST /api/auth/login
 * @description Login a user,expect email and password in the request body
 * @access Public
 */

authRouter.post('/login', authController.loginUserController);


/**
 * @route POST /api/auth/logout
 * @description Logout a user,expect token in the request header
 * @access Public
 */

authRouter.post('/logout', authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get the the current loggen in user details
 * @access Private
 */

authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);




module.exports = authRouter;