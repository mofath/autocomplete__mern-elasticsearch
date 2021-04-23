const { ProductModel } = require("../../models");

exports.createProduct = async (serviceData) => {
    try {
        const product = new ProductModel({ ...serviceData });
        const result = await product.save();
        return result;
    } catch (error) {
        console.log("Something went wrong: Service: createProduct", error.message);
        throw new Error(error);
    }
};