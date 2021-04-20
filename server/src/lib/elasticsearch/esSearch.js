const client = require("./client")

const esSearch = (ind, ty, query) => {
  return client.search({
    index: ind,
    type: ty,
    body: {
      "suggest": {
        "docsuggest": {
          "prefix": query,
          "completion": {
            "field": "suggest"
          }
        }
      }
    }
  })
}

module.exports = esSearch;