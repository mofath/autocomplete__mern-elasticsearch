const express = require("express");
const router = express.Router();
const { findAndFilterProducts } = require("../services");

router.post("/", findAndFilterProducts);

module.exports = router;
