const { ProductModel } = require("../../models");

module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
    try {
        let products = await ProductModel.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return products.map((product) => product.toObject())
    } catch (error) {
        console.log('Something went wrong: Service: getAllProducts', error.message);
        throw new Error(error);
    }
}