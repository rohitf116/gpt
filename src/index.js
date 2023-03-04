const express = require("express");
const dotenv = require("dotenv");
const openAi = require("./routes/gpt");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose
  .connect("mongodb+srv://adymize:9MdhoPi8DIHExzyQ@saasjs.zktsyif.mongodb.net/")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.use("/", openAi);
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
