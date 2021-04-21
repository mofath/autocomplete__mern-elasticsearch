const mongoose = require("mongoose");
const config = require("../../config");

const DB_URL = config.mongoose.url;
const options = config.mongoose.options;

class DBManager {
  constructor() {
    if (!DBManager.instance) {
      this._conn = mongoose;
      DBManager.instance = this;
    }
    return DBManager.instance;
  }

  CONNECT() {
    console.log("Connecting to db...");
    this._conn.connect(DB_URL, options);
    return this._conn.connection;
  }

  DISCONNECT(){
    console.log("Closing db connection...");
    this._conn.connection.close();
  }

  get conn() {
    this.CONNECT();
    return this._conn.connection;
  }
}

const instance = new DBManager()
Object.freeze(instance)

module.exports = instance;
