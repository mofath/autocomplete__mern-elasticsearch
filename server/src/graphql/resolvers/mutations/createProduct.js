const { productService } = require("../../../services");
const { esService } = require("../../../services");
const { PRODUCTS_INDEX, PRODUCTS_TYPE, mappings: { productsMapping } } = require("../../../constant/es.constants");

exports.createProduct = async (obj, { productInput }, ctx, info) => {
  try {
    const { id } = await productService.createProduct(productInput);
    const { price, ...indexingData } = productInput;
    const document = { id, ...indexingData, suggest: { input: productInput.name.split(" ") } }
    await esService.addDocument(PRODUCTS_INDEX, PRODUCTS_TYPE, document, productsMapping);
    delete document.suggest;
    document.price = price;
    return document;
  } catch (error) {
    console.log("Something went wrong: GraphQL mutatuion: createProduct:", error.message);
    throw error;
  }
}

