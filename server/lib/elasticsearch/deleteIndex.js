const client = require("./client");

const deleteIndex = (ind) => {
    return client.indices.delete({ index: ind })
}

module.exports = deleteIndex;