const client = require("./client");

const deleteDocument = (data) => {
    client.delete(data, (err, resp, status) => {
        console.log(resp)
    })
}

module.exports = deleteDocument;