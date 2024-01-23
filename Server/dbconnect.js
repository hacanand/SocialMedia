const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
//dotenv.config("/.env");

module.exports = async () => {
  const mongoUri =
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";
  try {
    const connect = await mongoose.connect(mongoUri); 
    console.log(`MongoDB connected: ${connect.connection.host}`);

  } catch (err) {
      console.log(err);
      process.exit(1);
  }
};
 