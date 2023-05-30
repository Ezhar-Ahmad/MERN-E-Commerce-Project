// To connect with MongoDb database
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = "mongodb://127.0.0.1:27017/ElectroMatch";
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // To check your connection was successful
  const conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("Database connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("Database disconnected.");
  });
  conn.on("error", console.error.bind(console, "Connection error:"));
};

module.exports = connectDB;
