import { productsQuery } from "../queries";
import client from "../client";

export const loadProducts = async () => {
    const { data } = await client.query({ query: productsQuery });
    console.log(data);
    return data;
};