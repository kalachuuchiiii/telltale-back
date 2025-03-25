const { User } = require("../models/userModel.js");


const checkUserExist = async(req, res, next) => {
  const name = req.body.name.trim().toLowerCase();
  const password = req.body.password.trim().toLowerCase();
  if(!name || !password){
    return res.status(400).json({
      success: false, 
      message: "Please fill up the required documents"
    })
  }
  try {
    req.userExist = await User.findOne({name});
    next();
  }catch(e){
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error"
    })
  }
}

module.exports = { checkUserExist };