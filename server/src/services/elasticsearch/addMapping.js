const client = require("./client");

const addMapping = (ind, ty, mapping) => {
    return client.indices.putMapping({
        index: ind,
        type: ty,
        body: mapping,
        includeTypeName: true
    });
}

module.exports = addMapping;
