const { ProductModel } = require("./models/product.model");

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
    createProduct: async (obj, { productInput }, ctx, info) => {
      const newProduct = new ProductModel({
        name: productInput.name,
        brand: productInput.brand,
        price: productInput.price,
        image: productInput.image,
      });

      try {
        const createdProduct = await newProduct.save();
        return createdProduct._doc;
      } catch (error) {
        console.log(err);
        throw err;
      }
    },
  },
};

module.exports = resolvers;
