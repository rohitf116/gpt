const express = require("express");
const dotenv = require("dotenv");
const openAi = require("./routes/gpt");
const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;
app.use("/", openAi);
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
