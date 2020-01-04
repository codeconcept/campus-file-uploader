const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));

const allowedImageMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif"
];
// max 10MB
const upload = multer({
  dest: "public",
  limits: 10 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    cb(null, allowedImageMimeTypes.includes(file.mimetype));
  }
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

router.get("/", (req, res) => {
  res.send("Accueil");
});

router.get("/images/new", (req, res) => {
  res.render("image-form", {});
});

router.post("/images/new", upload.single("picture"), (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  res.render("image-form", {});
});

const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
