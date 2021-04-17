const client = require("./client")

const tries = 3;

const sleep = (ms) => new Promise((res) => setTimeout(() => res(), ms));

const esConnect = async () => {
    while (tries) {
        try {
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


module.exports = esConnect;