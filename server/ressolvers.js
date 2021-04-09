const { ProductModel } = require("./models/product.model");
const { INDEX_NAME, INDEX_TYPE } = require("./es-client");

const resolvers = {
  Query: {
    hello: () => "hi",
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
      const results = await esClient.search({
        index: INDEX_NAME,
        type: INDEX_TYPE,
        body: {
          suggest: {
            titleSuggester: {
              prefix: query,
              completion: {
                field: "titleSuggest",
                fuzzy: {
                  fuzziness: "auto",
                },
              },
            },
          },
        },
      });

      return results.suggest.titleSuggester[0].options.map((x) => x._source);
    },
  },
  Mutation: {
    createProduct: async (obj, { productInput }, { esClient }, info) => {
      const newProduct = new ProductModel({
        name: productInput.name,
        brand: productInput.brand,
        price: productInput.price,
        image: productInput.image,
      });

      try {
        const createdProduct = await newProduct.save();
        await esClient.index({
          index: INDEX_NAME,
          type: INDEX_TYPE,
          id: createdProduct._id,
          body: newProduct,
        });
        return createdProduct._doc;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
