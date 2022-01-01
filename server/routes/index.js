const express = require("express");

const linkController = require("../controllers/linkController");

// require the path
const path = require("path");

//require express router
const router = require("express").Router();


router.route("/")
  .get(linkController.findAll)

router.route("/add")
  .post(linkController.create);

router.route("/:url")
  .get(linkController.findByUrl)

//export router to use in other files
module.exports = router;