const { ProductModel } = require("../../../models/product.model");
const { addDocument } = require("../../../lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("../../../constant/elasticsearch-constants");
const mappings = require("../../../constant/mappings.json");

exports.createProduct = async (obj, { productInput }, { esClient }, info) => {
  const newProduct = new ProductModel(productInput)
  console.log(productInput);

  try {
    const createdProduct = await newProduct.save();

    const document = {
      name: createdProduct._doc.name,
      image: createdProduct._doc.image,
      brand: createdProduct._doc.brand,
      id: createdProduct._doc._id.toString(),
      suggest: { input: createdProduct._doc.name.split(" ") }
    }

    await addDocument(PRODUCTS_INDEX, PRODUCTS_TYPE, document, mappings.productsMapping);

    delete document.suggest;
    document.price = createdProduct._doc.price;
    return document;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

