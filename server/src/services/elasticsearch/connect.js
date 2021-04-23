const client = require("./client")

const tries = 3;

const sleep = (ms) => new Promise((res) => setTimeout(() => res(), ms));

const connect = async () => {
    while (tries) {
        try {
            await client.ping({ requestTimeout: 1000 });
            console.log("Connected to elasticsearch cluster");
            return client;
        } catch (err) {
            console.log(err.message);
            console.trace("Elasticsearch cluster is down!");
        }
        console.log(`could not connect to es ${tries} tries left`);
        tries -= 1;
        // wait 30 seconds
        await sleep(30000);
    }
    throw new Error("es timeout");
};


module.exports = connect;