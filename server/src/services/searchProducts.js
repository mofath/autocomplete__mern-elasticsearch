const { ProductModel } = require("../models/product.model");

module.exports.searchProducts = async ({ searchTerm, findArgs = {}, sortBy, order, skip, limit }) => {
  try {
    const products = searchTerm
      ? await ProductModel.find({ ...findArgs })
        .find({ $text: { $search: term } })
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .select("name price brand category image")
        .lean()
      : await ProductModel.find({ ...findArgs })
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .select("name price brand category image")
        .lean();
    return products.map((product) => product.toObject());
  } catch (err) {
    console.log('Something went wrong: Service: searchProducts', error.message);
    throw new Error(error);
  }
};

