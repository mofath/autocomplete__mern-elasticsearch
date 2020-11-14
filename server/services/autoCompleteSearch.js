const { ProductModel } = require("../models/product.model");
const { HttpStatus, STATUS_MAP_MESSAGE } = require("../constant");

module.exports.autoCompleteSearch = async (req, res, next) => {
  const query = req.body.searchTerm;
  try {
    const results = await ProductModel.search({ query });
    res.send(results);
  } catch (err) {
    console.error(err.message);
    const error = new Error();
    error.status = HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = STATUS_MAP_MESSAGE[HttpStatus.INTERNAL_SERVER_ERROR];
    next(error);
  }
};
