const express = require("express");
const router = express.Router();
const fs = require("fs");

let allImagesName = [];

router.get("/", (req, res) => {
  fs.readdir("public/images", (err, files) => {
    if (err) {
      console.error(err);
      res.render("home", {
        allImagesName: [],
        error: "Images non disponibles"
      });
    } else {
      res.render("home", { allImagesName: files, error: "" });
      return files;
    }
  });
});

module.exports = router;
