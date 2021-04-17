const client = require("./client");


const countDocuments = (ind, ty) => {
    return client.count({ index: ind, type: ty })
}

module.exports = countDocuments;