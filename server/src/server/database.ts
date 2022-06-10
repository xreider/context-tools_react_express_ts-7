//The require(‘mongoose’) call above returns a Singleton object.
//It means that the first time you call require(‘mongoose’), it
//is creating an instance of the Mongoose class and returning it.
//On subsequent calls, it will return the same instance that was
//created and returned to you the first time because of how module
//import/export works in ES6.
// const mongoose = require('mongoose');
import mongoose from "mongoose";
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useCreateIndex', true);
mongoose.set("runValidators", true);

// const Message = require('../models/MessageSchema');

const DB = process.env.DB || "mongodb://127.0.0.1:27017/hskwiki-react-3";

class Database {
  constructor() {
    const dbStart = async () => {
      try {
        await this.connect();
        // await this.createConnection();
      } catch (error) {
        console.log("dbStart error " + error);
      }
    };

    dbStart();
  }

  connect() {
    mongoose
      .connect(<string>DB)
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log("DB connection error " + err);
      });
  }

  async createConnection() {
    try {
      const db = await mongoose.createConnection(<string>DB);
      console.log("createConnection successful");
      db.on("error", (error) => console.log(error));
      db.once("open", () => console.log("Connected to DB"));
    } catch (error) {
      console.log("createConnection error " + error);
    }
  }
}

module.exports = new Database();
