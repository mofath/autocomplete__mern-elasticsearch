const client = require("./client")

const search = (ind, ty, query) => {
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

module.exports = search;