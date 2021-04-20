const { esSearch } = require("../../../lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/elasticsearch-constants")

exports.search = async (_, { query }, { esClient }) => {
  console.log(query);
  try {
    const { suggest: { docsuggest } } = await esSearch(PRODUCTS_INDEX, PRODUCTS_TYPE, query);
    return docsuggest[0].options.map(doc => {
      return {
        name: doc._source._doc,
        brand: doc._source.brand,
        image: doc._source.image,
        id: doc._source.id
      }
    })
  } catch (err) {
    console.log(err.message);
  }
}