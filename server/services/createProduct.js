const { ProductModel } = require("../models/product.model");

exports.createProduct = async (serviceData) => {
    try {
        const product = new ProductModel({
            name: serviceData.name,
            price: serviceData.price,
            brand: serviceData.brand,
            image: serviceData.image,
        });
        const result = await product.save();
        return result;
    } catch (error) {
        console.log("Something went wrong: Service: createProduct", error);
        throw new Error(error);
    }
};