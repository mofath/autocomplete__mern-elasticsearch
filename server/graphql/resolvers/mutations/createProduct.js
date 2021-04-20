const { ProductModel } = require("../../../models/product.model");
const { addDocument } = require("../../../lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/elasticsearch-constants");
const mappings = require("../../../constant/mappings.json");

exports.createProduct = async (obj, { productInput }, { esClient }, info) => {
  const newProduct = new ProductModel(productInput)

  try {
    const createdProduct = await newProduct.save();

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

