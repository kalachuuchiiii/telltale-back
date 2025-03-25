const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    unique: true, 
    required: true, 
    index: true,
    trim: true, 
    lowercase: true
  },
    password: {
      type: String, 
      required: true,
      trim: true
    },
    bsf: {
      type: String, 
      lowercase: true, 
      trim: true, 
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.pre("save", async function (next) {
  if(this.isModified("password")){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  next(1);
})

const User = mongoose.model("User", userSchema);

module.exports = { User };