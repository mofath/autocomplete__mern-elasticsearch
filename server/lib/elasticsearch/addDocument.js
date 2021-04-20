const client = require("./client");
const createIndex = require("./createIndex");

const addDocument = (ind, ty, document, mapping) => {
    console.log(ind, ty);

    return createIndex(ind, ty, mapping).then((resp) => {
        client.index({
            index: ind,
            type: ty,
            body: document
        }, (err, resp, status) => {
            console.log(resp)
        })
    })
}

module.exports = addDocument;