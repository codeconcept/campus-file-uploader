const express = require("express");
const app = express();
const homeRouter = require("./routes/home");
const imageRouter = require("./routes/images");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.use("/", homeRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
