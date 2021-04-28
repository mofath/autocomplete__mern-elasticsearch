const { esService } = require("../../../services");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/es.constants")

exports.autocomplete = async (_, { text }, ctx) => {
  try {
    const { suggest: { docsuggest } } = await esService.search(PRODUCTS_INDEX, PRODUCTS_TYPE, text);
    return docsuggest[0].options.map(doc => {
      console.log(doc);
      return {
        name: doc._source.name,
        brand: doc._source.brand,
        image: doc._source.image,
        id: doc._source.id
      }
    })
  } catch (err) {
    console.log(err.message);
  }
} 