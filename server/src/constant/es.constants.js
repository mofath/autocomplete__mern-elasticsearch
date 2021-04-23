exports.PRODUCTS_INDEX = "products";
exports.PRODUCTS_TYPE = "products";

exports.mappings = {
    "productsMapping": {
        "properties": {
            "name": { "type": "keyword" },
            "image": { "type": "text" },
            "brand": { "type": "keyword" },
            "id": { "type": "text", "index": false },
            "suggest": { "type": "completion" }
        }
    }
}

