const productService = require("../../../services");
const { addDocument } = require("../../../lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/elasticsearch-constants");
const mappings = require("../../../constant/mappings.json");

exports.createProduct = async (obj, { productInput }, { esClient }, info) => {
  try {
    const createdProduct = await productService.createProduct(productInput)

    const document = {
      name: createdProduct.name,
      image: createdProduct.image,
      brand: createdProduct.brand,
      id: createdProduct.id,
      suggest: { input: createdProduct.name.split(" ") }
    }

    await addDocument(PRODUCTS_INDEX, PRODUCTS_TYPE, document, mappings.productsMapping);

    delete document.suggest;
    document.price = createdProduct.price;
    return document;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

