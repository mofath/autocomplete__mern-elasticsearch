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
