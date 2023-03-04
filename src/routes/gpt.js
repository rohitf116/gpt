// /openAi

const express = require("express");
const { openAi, openAi2 } = require("../controller/gpt");
const router = express.Router();

router.route("/").post(openAi);
router.route("/:id").post(openAi2);

module.exports = router;
