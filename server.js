const express = require("express");
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

router.get("/", (req, res) => {
  res.send("Accueil");
});

router.get("/images/new", (req, res) => {
  res.render("image-form", {});
});

const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
