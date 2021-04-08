const elasticsearch = require("elasticsearch");

let tries = 3;

const sleep = (ms) => new Promise((res) => setTimeout(() => res(), ms));

const getEsClient = async () => {
  while (tries) {
    try {
      const client = new elasticsearch.Client({
        host: "localhost:9200",
        log: "trace",
      });
      await client.ping({ requestTimeout: 1000 });
      console.log("All is well");
      return client;
    } catch (err) {
      console.log(err.message);
      console.trace("elasticsearch cluster is down!");
    }
    console.log(`could not connect to es ${tries} tries left`);
    tries -= 1;
    // wait 30 seconds
    await sleep(30000);
  }

  throw new Error("es timeout");
};

const INDEX_NAME = "product";
const INDEX_TYPE = "product";

module.exports = {
  getEsClient,
  INDEX_NAME,
  INDEX_TYPE,
};
