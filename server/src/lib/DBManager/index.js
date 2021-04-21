const mongoose = require("mongoose");
const config = require("../../config");

const DB_URL = config.mongoose.url;
const options = config.mongoose.options;


let instance = null;
class DBManager {
  constructor() {
    this._conn = null;
  }

  static getInstance() {
    if (!instance) {
      instance = new DBManager();
    }
    return instance;
  }

  CONNECT() {
    console.log("Connecting to db...");
    mongoose.connect(DB_URL, options);
    this._conn = mongoose.connection;
  }

  get conn() {
    this.CONNECT();
    return this._conn;
  }
}

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connected error " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = DBManager;
