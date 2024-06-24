const mongoose = require("mongoose");

class Dbconnect {
  constructor() {
    this.connect();
  }
  connect() {
    return mongoose
      .connect("mongodb://127.0.0.1:27017/vulture")
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new Dbconnect();
