const config = {
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/product-search",
  PORT: process.env.PORT || 5000,
};

module.exports = config;
