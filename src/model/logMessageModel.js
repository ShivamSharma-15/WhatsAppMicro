const pool = require("../config/db");
const { logError } = require("../utils/errorHandler");

async function saveLogModel(body, serviceId, createdAt) {
  try {
    const [result] = await pool.query(
      "INSERT INTO logs (created_at, service_id, req.body) VALUES (?, ?, ?);",
      [createdAt, serviceId, body]
    );

    if (!result || !result.insertId) {
      logError("logger model");
    }

    return true;
  } catch (err) {
    console.log(err);
    logError("logger model", err);
    return { error: true };
  }
}
module.exports = { saveLogModel };
