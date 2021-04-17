const { ProductModel } = require("./models/product.model");
const { esSearch, addDocument } = require("./lib/elasticsearch");
const { PRODUCTS_INDEX, PRODUCTS_TYPE } = require("./constant/elasticsearch-constants");
const mappings = require("./constant/mappings.json");

const resolvers = {
  Query: {
    products: async () => {
      try {
        const products = await ProductModel.find();
        return products.map((product) => {
          return { ...product._doc, _id: product.id };
        });
      } catch (err) {
        throw err;
      }
    },
    search: async (_, { query }, { esClient }) => {
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
    },
  },
  Mutation: {
    createProduct: async (obj, { productInput }, { esClient }, info) => {
      const newProduct = new ProductModel({
        name: productInput.name,
        brand: productInput.brand,
        price: productInput.price,
        image: productInput.image,
      })

      try {
        console.log(PRODUCTS_INDEX, PRODUCTS_TYPE);

        const createdProduct = await newProduct.save();
        await addDocument(PRODUCTS_INDEX, PRODUCTS_TYPE, createdProduct._doc, mappings.productsMapping)
        return {
          name: createdProduct._doc.name,
          brand: createdProduct._doc.brand,
          image: createdProduct._doc.image,
          price: createdProduct._doc.price,
          id: createdProduct._id
        };
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
