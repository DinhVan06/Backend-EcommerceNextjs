const { default: mongoose } = require("mongoose");
const { Category } = require("../models");
// mongoose
mongoose.connect("mongodb://localhost:27017/Website");
var express = require("express");
const { findDocuments } = require("../helpers/MongoDBHelpers");
var router = express.Router();
const COLLECTION_NAME = "categories";
// post
router.post("/", (req, res, next) => {
  try {
    const data = req.body;

    const newItem = new Category(data);

    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500).json({ message: err.message });
  }
});

// get all
router.get("/", (req, res, next) => {
  try {
    Category.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get theo id
router.get("/id", (req, res, next) => {
  try {
    const { id } = req.params;
    Category.find(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(404).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// patch category
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Category.findByIdAndUpdate(id, data, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});

// delete category
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    Category.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});
module.exports = router;
