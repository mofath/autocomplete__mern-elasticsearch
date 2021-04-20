const client = require("./client")

const isIndexExist = (ind) => {
    return client.indices.exists({ index: ind })
}

module.exports = isIndexExist;