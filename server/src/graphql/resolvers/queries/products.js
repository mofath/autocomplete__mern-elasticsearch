const { ProductModel } = require("../../../models/product.model");

exports.products = async () => {
    try {
        const products = await ProductModel.find();
        return products.map((product) => {
            return { ...product._doc, _id: product.id };
        });
    } catch (err) {
        throw err;
    }
}
