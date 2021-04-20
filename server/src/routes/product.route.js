const express = require("express");

const router = express.Router();

const { findAndFilterProducts, getProducts } = require("../services");

router.get("/", getProducts);

router.post("/filter_products", findAndFilterProducts);

module.exports = router;