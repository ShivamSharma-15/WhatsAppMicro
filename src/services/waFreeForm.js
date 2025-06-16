const axios = require("axios");
const { logError } = require("../utils/errorHandler");
const { heal } = require("../utils/heal");

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function waFreeForm(number, sender, type, message, access_token) {
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

  if (response) {
    heal(response.data);
  } else {
    heal({
      error: true,
      message: lastError?.message,
      data: lastError?.response?.data || null,
    });
  }

  return "OK";
}

module.exports = { waFreeForm };
