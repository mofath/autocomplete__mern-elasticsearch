const client = require("./client");
const createIndex = require("./createIndex");

const addDocument = (ind, ty, document, mapping) => {
    console.log(ind, ty);

    return createIndex(ind, ty, mapping).then((resp) => {
        client.index({
            index: ind,
            type: ty,
            body: {
                name: document.name,
                image: document.image,
                brand: document.brand,
                id: document._id.toString(),
                suggest: {input: document.name.split(" ")}
            }
        }, (err, resp, status) => {
            console.log(resp)
        })
    })
}

module.exports = addDocument;