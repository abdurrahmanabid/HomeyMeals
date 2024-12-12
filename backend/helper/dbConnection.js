const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database Connected");
  });
}

module.exports = dbConnection;
