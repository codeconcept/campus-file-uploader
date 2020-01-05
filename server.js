const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const allowedImageMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif"
];

let uploadedImageName = "";
let allImagesName = [];

var storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      uploadedImageName = raw.toString("hex") + path.extname(file.originalname);
      cb(null, uploadedImageName);
    });
  }
});

// max 10MB
const upload = multer({
  dest: "public/images",
  limits: 10 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    cb(null, allowedImageMimeTypes.includes(file.mimetype));
  },
  storage: storage
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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

router.get("/images/new", (req, res) => {
  res.render("image-form", { uploadedImageName });
});

router.post("/images/new", upload.single("picture"), (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  res.render("image-form", { uploadedImageName });
});

const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
