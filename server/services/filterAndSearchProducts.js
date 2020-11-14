const { ProductModel } = require("../models/product.model");
const { HttpStatus, STATUS_MAP_MESSAGE } = require("../constant");

module.exports.findAndFilterProducts = async (req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", "...FILTERED PRODUCT REQUEST...");

  const { searchTerm } = req.body;
  const { filters } = req.body;

  let findArgs = {};
  let products = [];

  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "price")
        findArgs[key] = { $gte: filters[key][0], $lte: filters[key][1] };
      else if (key === "category") findArgs = { "category.name": filters[key] };
      else findArgs[key] = filters[key];
    }
  }

  try {
    products = searchTerm
      ? await ProductModel.find({ $text: { $search: searchTerm } })
          .select("name price brand category image")
          .lean()
      : await ProductModel.find(findArgs)
          .select("name price brand category image")
          .lean();
  } catch (err) {
    console.error(err.message);
    const error = new Error();
    error.status = HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = STATUS_MAP_MESSAGE[HttpStatus.INTERNAL_SERVER_ERROR];
    next(error);
  }
  return res.status(HttpStatus.OK).json({
    message: { msgBody: STATUS_MAP_MESSAGE[HttpStatus.OK], msgError: false },
    products,
  });
};
