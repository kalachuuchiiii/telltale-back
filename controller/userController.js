const { User } = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
  const name = req.body.name.trim().toLowerCase();
  const password = req.body.password.trim().toLowerCase();
  console.log(name, password)
  
  try {
    if(req.userExist){
      return res.status(409).json({
        success: false, 
        message: "This user already exists"
      })
    }
    const newUser = new User({ name, password });
    await newUser.save(); 
    return res.status(200).json({
      success: false, 
      message: "Your account has successfully been created!"
    })
  }catch(e){
    console.log(e)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      e
    })
  }
  
}

const login = async(req, res) => {
  const name = req.body.name.trim().toLowerCase()
  const password = req.body.password.trim().toLowerCase();
  
  if(!req.userExist || !(await req.userExist.comparePassword(password))){
    return res.status(404).json({
      success: false, 
      message: "Invalid username or password"
    })
  }
  
  try {
    const token = await jwt.sign({ _id: req.userExist._id},process.env.JWT_SECRET, { expiresIn: "30h"})
    
    res.cookie("session", token, {
      httpOnly: process.env.NODE_ENV !== "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production"
    })
    console.log(token);
    return res.status(200).json({
      success: true, 
      message: "Logged in successfully",
      token
    })
  }catch(e){
    console.log()
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error",
      e
    })
  }
}

const checkSession = async(req, res) => {
  try {
    const token = req.cookies.session; 
    if(!token){
       return res.status(400).json({
        success: true, 
        message: "No ongoing session"
      })
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded._id){
      return res.status(400).json({
        success: true, 
        message: "No ongoing session"
      })
    }
    const userInfo = await User.findById(decoded._id);
    return res.status(200).json({
      success: true, 
      message: "Session ongoing", 
      userInfo
    })
  }catch(e){
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error"
    })
  }
}

const terminateSession = async(req, res) => {
  try {
    res.clearCookie("session");
    return res.status(200).json({
      success: true, 
      message: "Logged out successfully!"
    })
  }catch(e){
    console.log({e});
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

module.exports = { register, login, checkSession, terminateSession };