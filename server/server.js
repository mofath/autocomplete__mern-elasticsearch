const http = require("http");
const app = require("./app");
const elasticsearch = require("elasticsearch");
const config = require("./config");
const DBManager = require("./lib/DBManager");

const server = http.createServer(app);

const PORT = config.PORT;

const db = DBManager.getInstance();
db.conn.once("open", (err) => {
  if (err) console.log("Database connection failure");
  else {
    console.log("Database connection is opened");
    const client = new elasticsearch.Client({
      host: "localhost:9200",
    });
    server.listen(PORT, () =>
      console.log(`server is listening at port ${PORT}`)
    );
  }
});
