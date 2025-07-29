const express = require("express");
const {
  waTemplateController,
  waFreeFormController,
} = require("../controller/waController");
const router = express.Router();
const { serviceAccessValidator } = require("../validator/serviceValidator");

// Routes to handle templates and non templates
router.post("/template", serviceAccessValidator, waTemplateController);
router.post("/free-form", serviceAccessValidator, waFreeFormController);

module.exports = router;
