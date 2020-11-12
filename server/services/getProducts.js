const { ProductModel } = require("../models/product.model");

module.exports.findAndFilterProducts = async (req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", "...FILTERED PRODUCT REQUEST...");

  const searchTerm = req.body.searchTerm;
  let findArgs = {};
  let products = [];

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] =
        key === "price"
          ? { $gte: req.body.filters[key][0], $lte: req.body.filters[key][1] }
          : req.body.filters[key];
    }
  }

  try {
    products = searchTerm
      ? await ProductModel.find(findArgs)
          .find({ $text: { $search: searchTerm } })
          .select("name price brand category image")
          .lean()
      : await ProductModel.find(findArgs)
          .select("name price brand category image")
          .lean();
  } catch (err) {
    console.error(err.message);
  }
  return res.status(200).json({
    message: { msgBody: "success", msgError: false },
    products,
  });
};
