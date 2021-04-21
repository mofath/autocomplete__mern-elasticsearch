const mongoose = require("mongoose");
const config = require("../../config");

const DB_URL = config.mongoose.url;
const options = config.mongoose.options;

module.exports = (() => {
  let instance;
  let conn = mongoose;

  const connectToDb = () => {
    conn.connect(DB_URL, options);
    return conn.connection;
  }

  const createInstance = () => {
    conn.connection.on('error', error => {
      console.error('Error in MongoDb connection: ' + error);
      conn.disconnect(); 
    });
    conn.connection.on('disconnected', () => {
      console.log('MongoDB disconnected!');
      connectToDb();
    });

    connectToDb();
    return conn.connection;
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();