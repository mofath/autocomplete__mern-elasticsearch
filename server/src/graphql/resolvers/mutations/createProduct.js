const productService = require("../../../services");
const esService = require("../../../lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/elasticsearch-constants");
const mappings = require("../../../constant/mappings.json");

exports.createProduct = async (obj, { productInput }, ctx, info) => {
  try {
    const { id } = await productService.createProduct(productInput);
    const { price, ...indexingData } = productInput;
    const document = { id, ...indexingData, suggest: { input: productInput.name.split(" ") } }
    await esService.addDocument(PRODUCTS_INDEX, PRODUCTS_TYPE, document, mappings.productsMapping);
    delete document.suggest;
    document.price = price;
    return document;
  } catch (error) {
    console.log("Something went wrong: GraphQL mutatuion: createProduct:", error.message);
    throw error;
  }
}

