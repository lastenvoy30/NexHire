const userModel = require("../models/user.model");  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description Register a new user
 * @access Public 
 */

async function registerUserController(req , res) {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({
      message: "please provide all required fields"
    })
  }
  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  }) 
  if(isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exist"
    })
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash
  })
  const token = jwt.sign({
    id: user._id,
    username: user.username,
  } , process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
  res.cookie("token", token, );

  return res.status(201).json({
    message: "user created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,  
    }
  });
}

/**
 * @name loginUserController
 * @description Login a user,expect email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if(!user) {
    return res.status(400).json({
      message: "invalid credentials"
    })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid) {
    return res.status(400).json({
      message: "invalid credentials"
    })
  }

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  res.cookie("token", token);
  res.status(200).json({
    message: "login successful",
    user: {
      id: user._id, 
      username: user.username,
      email: user.email
    }
  })  
  
}

/**
 * @name logoutUserController
 *  @description Logout a user,expect token in the request header
 * @access Public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token })
  }
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
} 



module.exports = {
  registerUserController, 
  loginUserController,
  logoutUserController
};