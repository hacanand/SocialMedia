const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { error, success } = require("../utils/responseWrapper");
//const cookieParser = require("cookie-parser");

const signUpController = async (req, res) => {
  try {
    // res.status(200).send("signUpController activated");
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.send(error(400, "Not all fields have been entered"));
      // return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    const oldUser = (await User.findOne({ email }));
    if (oldUser) {
      return res.status(409).json({ msg: "User already exists" }); //conflict status
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
const loginController = async (req, res) => {
  try {
    //res.status(200).send("loginController activated");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "Not all fields have been entered"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.send(error(404, "User already exists"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send(error(400, "Invalid credentials"));
    }
    const accessToken = generateAccessToken({
      _id: user?._id,
    });
    const refreshToken = generateRefreshToken({
      _id: user?._id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:true,
    });

   return res.send(success(200,{refreshToken})) 
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
  
const logoutController=async (req,res)=>{
  try{
    res.clearCookie('refreshToken',{
      httpOnly:true,
      secure:true,
    })
    return res.send(success(200,'user logout'));

  }catch(e){
    return res.send(error(500,e.message))
  }
}
const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;


  if (!cookies.refreshToken) {
    return res.send(error(401, "refresh token in cookie is required"));
  }
  const refreshToken = cookies.refreshToken;
  console.log("refreshToken", refreshToken);
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
     
    // @ts-ignore
    const _id = decoded?._id;
    const accessToken = generateAccessToken({ _id });
    return res.send(success(201, { accessToken }));
  } catch (err) {
    console.log(err);
  }
};

const generateAccessToken = (data) => {
  try {
    const accessToken = jwt.sign(data,
       process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    console.log(refreshToken);
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  signUpController,
  loginController,
  refreshTokenController,
  logoutController,
 
};
// access - local storage
// refresh - http only cookie
