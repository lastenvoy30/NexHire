const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const bcrypt = require("bcryptjs");

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



module.exports = authRouter;