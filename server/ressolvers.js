const { ProductModel } = require("./models/product.model")

const resolvers = {
  Query: {
    hello: () => "hi",
    products: async () => {
      try {
        const products = await ProductModel.find();
        return products.map(product => {
          return { ...product._doc, _id: product.id };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createProduct: async (args) => {
      console.log(args.itemProduct);
      const item = new Item({
        name: args.itemProduct.name,
        brand: args.itemProduct.brand,
        price: +args.itemProduct.price,
        image: args.itemProduct.image,
      });

      try {
        const createdProduct = await item.save();
        return createdProduct._doc;
      }
      catch (error) {
        console.log(err);
        throw err;
      }
    }
  }
};


module.exports = resolvers;