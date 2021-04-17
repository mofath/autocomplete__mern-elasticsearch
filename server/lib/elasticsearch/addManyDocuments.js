const client = require("./client");

const addManyDocuments = (ind, ty, data) => {
    return client.bulk({
        index: ind,
        type: ty,
        body: data
    })
}

module.exports = addManyDocuments;