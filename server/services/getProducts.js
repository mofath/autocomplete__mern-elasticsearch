const { ProductModel } = require("../models/product.model");
const { HttpStatus, STATUS_MAP_MESSAGE } = require("../constant/httpError");

module.exports.getProducts = async (req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", "...GET PRODUCT REQUEST...");
  try {
    const products = await ProductModel.find({});
    return res.status(HttpStatus.OK).json({
      message: { msgBody: STATUS_MAP_MESSAGE[HttpStatus.OK], msgError: false },
      products,
    });
  } catch (err) {
    console.error(err.message);
    const error = new Error();
    error.status = HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = STATUS_MAP_MESSAGE[HttpStatus.INTERNAL_SERVER_ERROR];
    next(error);
  }
};
