const mongoose = require("mongoose");
const config = require("./config");
const DBManager = require("./lib/DBManager");
const { esConnect } = require("./lib/elasticsearch/index");

const http = require('http');
const app = require('./app');

const PORT = config.PORT;
const server = http.createServer(app);
const db = DBManager.getInstance();

db.conn.once("open", async (err) => {
  if (err) console.log("Database connection failure");
  else {
    console.log("Database connection is opened");
    await esConnect();
    server.listen(PORT, () =>
      console.log(`server is listening at port ${PORT}`)
    );
  }
});

