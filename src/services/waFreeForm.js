const axios = require("axios");
const { logError } = require("../utils/errorHandler");
const { getUTCDateTime } = require("../utils/timeUtil");
const { saveLogModel } = require("../model/logMessageModel");

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

async function waFreeForm(
  number,
  sender,
  type,
  message,
  access_token,
  serviceId
) {
  const data = {
    messaging_product: "whatsapp",
    to: number,
    type: type,
    [type]: message,
  };

  let attempt = 0;
  let response = null;
  let lastError = null;

  while (attempt < MAX_RETRIES) {
    try {
      response = await axios.post(
        `https://graph.facebook.com/v22.0/${sender}/messages`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) break;
    } catch (error) {
      lastError = error;
      logError(`waFreeForm attempt ${attempt + 1}`, error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }

    attempt++;
  }
  if (response.status === 200) {
    body = {
      number,
      sender,
      type,
      message,
    };
    const createdAt = getUTCDateTime();
    const log = await saveLogModel(body, serviceId, createdAt);
    return "OK";
  } else {
    return "ERROR";
  }
}

module.exports = { waFreeForm };
