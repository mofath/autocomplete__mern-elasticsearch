import { productsQuery } from "../queries";
import client from "../client";

export const loadProducts = async () => {
    return await client.query({ query: productsQuery });
};