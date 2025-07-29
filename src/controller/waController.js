const { waFreeForm } = require("../services/waFreeForm");
const { waTemplate } = require("../services/waTemplate");
const { logError } = require("../utils/errorHandler");

async function waTemplateController(req, res) {
  try {
    const {
      number,
      sender,
      templateName,
      language,
      components,
      access_token,
      serviceId,
    } = req.body;

    const answer = await waTemplate(
      number,
      sender,
      templateName,
      language,
      components,
      access_token,
      serviceId
    );

    res.json({ status: "success", data: answer });
  } catch (error) {
    console.log(error);
    logError("waController", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function waFreeFormController(req, res) {
  try {
    const { number, sender, type, message, access_token, serviceId } = req.body;

    const result = await waFreeForm(
      number,
      sender,
      type,
      message,
      access_token,
      serviceId
    );

    res.json({ status: "success", data: result });
  } catch (error) {
    logError("waFreeFormController", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = { waTemplateController, waFreeFormController };
