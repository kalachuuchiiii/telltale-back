const mongoose = require("mongoose");

const connectDb = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URL)
  }catch(e){
    throw new Error(e);
  }
}

module.exports = {connectDb};