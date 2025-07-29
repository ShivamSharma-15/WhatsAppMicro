const pool = require("../config/db");
const { logError } = require("../utils/errorHandler");

async function getService(serviceIdentifier, serviceName) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM services WHERE service_identifier = ? AND service_name = ?;",
      [serviceIdentifier, serviceName]
    );
    if (!rows || rows.length === 0) {
      logError("getService");

      return null;
    }

    return rows[0];
  } catch (err) {
    console.log(err);
    logError("getService", err);

    return { error: true };
  }
}

module.exports = { getService };
