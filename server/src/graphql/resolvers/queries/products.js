const { productService } = require("../../../services");

exports.products = async (_, { skip, limit }, ctx) => {
    try {
        const products = await productService.getAllProducts({ skip, limit })
        return products
    } catch (error) {
        console.log("Something went wrong: GraphQL query: products:", error.message);
        throw error;
    }
}
