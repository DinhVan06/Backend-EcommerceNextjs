const { default: mongoose } = require("mongoose");

const { Product } = require("../models");

// require
const { findDocuments } = require("../helpers/MongoDBHelpers");
// MONGOOSE
mongoose.connect("mongodb://localhost:27017/Website");

var express = require("express");
var router = express.Router();

// post
router.post("/", function (req, res, next) {
  try {
    const dataProduct = req.body;
    const newItem = new Product(dataProduct);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500);
  }
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    Product.find()
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    res.status(500);
  }
});

// get id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findById(id)
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    res.status(500);
  }
});

router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    Product.findByIdAndUpdate(id, data, {
      new: true,
    }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500);
  }
});

// delete
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
