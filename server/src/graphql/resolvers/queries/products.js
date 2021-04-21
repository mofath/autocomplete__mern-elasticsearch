const { ProductModel } = require("../../../models/product.model");

exports.products = async () => {
    try {
        const products = await ProductModel.find();
        return products.map((product) => product.toObject());
    } catch (err) {
        throw err;
    }
}
