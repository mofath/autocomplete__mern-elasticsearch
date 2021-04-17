const client = require("./client");
const isIndexExist = require("./isIndexExist");
const addMapping = require("./addMapping")


const createIndex = async (ind, ty, mapping) => {
  try {
    const exists = await isIndexExist(ind)
    if (!exists) {
      console.log(`Creating index ${ind}...`)
      await client.indices.create({ index: ind })
      mapping && await addMapping(ind, ty, mapping)
    }
    else {
      console.log(`Index ${ind} exists`)
    }
  } catch (err) {
    console.log(`Unable to create index index ${ind}...`, err)
  }
}


module.exports = createIndex;