const express = require("express");
const {
  waTemplateController,
  waFreeFormController,
} = require("../controller/waController");
const router = express.Router();

// Routes to handle templates and non templates
router.post("/template", waTemplateController);
router.post("/free-form", waFreeFormController);

module.exports = router;
