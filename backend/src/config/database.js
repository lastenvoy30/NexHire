const mongoose = require('mongoose');

async function connectToDB(){
  try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("connected to db");
  } catch (error) {
      console.log("error connecting to db", error);
  }

}

module.exports = connectToDB; 