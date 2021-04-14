const elasticsearch = require("elasticsearch");


const client = new elasticsearch.Client({ host: "localhost:9200", log: "trace" });

let tries = 3;

const sleep = (ms) => new Promise((res) => setTimeout(() => res(), ms));

const getEsClient = async () => {
  while (tries) {
    try {
      await client.ping({ requestTimeout: 1000 });
      console.log("All is well");
      return client;
    } catch (err) {
      console.log(err.message);
      console.trace("elasticsearch cluster is down!");
    }
    console.log(`could not connect to es ${tries} tries left`);
    tries -= 1;
    // wait 30 seconds
    await sleep(30000);
  }
  throw new Error("es timeout");
};


const isIndexExist = (ind) => {
  return client.indices.exists({ index: ind })
}

const createIndex = async (ind) => {
  try {
    const exists = await isIndexExist(ind)
    if (!exists) {
      console.log(`Creating index ${ind}...`)
      await client.indices.create({ index: ind })
    }
    else {
      console.log(`Index ${ind} exists`)
    }
  } catch (err) {
    console.log(`Unable to create index index ${ind}...`, err)
  }
}

const deleteIndex = (ind) => {
  return client.indices.delete({ index: ind })
}

const insertOne = (ind, data) => {
  return createIndex(ind).then((resp) => {
    client.index(data, (err, resp, status) => {
      console.log(resp._id)
    })
  })
}

const insertMany = (ind, ty, data) => {
  return client.bulk({
    index: ind,
    type: ty,
    body: data
  })
}

const countDocuments = (ind, ty) => {
  return client.count({ index: ind, type: ty })
}

const deleteDocument = (data) => {
  client.delete(data, (err, resp, status) => {
    console.log(resp)
  })
}

const search = (ind, ty, text) => {
  return client.search({
    index: ind,
    type: ty,
    scroll: '10s',
    body: {
      query: {
        match: { productname: text }
      },
    }
  })
}

const getAll = (ind, ty) => {
  return client.search({
    index: ind,
    type: ty,
    scroll: '10s',
    body: {
      query: {
        match_all: {}
      },
    }
  })
}

const INDEX_NAME = "product";
const INDEX_TYPE = "product";

module.exports = {
  getEsClient,
  createIndex,
  deleteIndex,
  insertOne,
  insertMany,
  countDocuments,
  deleteDocument,
  search,
  getAll,
  INDEX_NAME,
  INDEX_TYPE,
};
