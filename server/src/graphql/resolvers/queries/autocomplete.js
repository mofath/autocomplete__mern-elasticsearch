const { esService } = require("../../../services");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/es.constants")

exports.autocomplete = async (_, { query }, ctx) => {
  try {
    const { suggest: { docsuggest } } = await esService.search(PRODUCTS_INDEX, PRODUCTS_TYPE, query);
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