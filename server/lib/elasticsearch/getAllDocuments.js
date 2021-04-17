const client = require("./client")

const getAllDocumentsOfIndex = (ind, ty) => {
    return client.search({
        index: ind,
        type: ty,
        scroll: '10s',
        body: {
            query: {
                match_all: {}
            },
        }
    })
}

module.exports = getAllDocumentsOfIndex;