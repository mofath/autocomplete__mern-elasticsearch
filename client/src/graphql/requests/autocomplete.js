import { autocompleteQuery } from "../queries";
import client from "../client";

export const autocomplete = async (text) => {
    return await client.query({ query: autocompleteQuery, variables: { text } });
};