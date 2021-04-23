const express = require("express");
const path = require("path");
const { CorsMiddleware } = require("./middlewares")
const graphqlServer = require("./graphql");


const app = express();
graphqlServer.applyMiddleware({ app });

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Handle cors
app.use(CorsMiddleware);

app.use("/images", express.static(path.join(__dirname, "../images")));

/**
 * Override 404 error
 */
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

/**
 * Catch Error
 */
app.use((error, req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", "...ERROR CAUGHT...");
  res.status(error.status || 500);
  return res.json({ message: { msgBody: error.message, msgError: true } });
});

module.exports = app;
