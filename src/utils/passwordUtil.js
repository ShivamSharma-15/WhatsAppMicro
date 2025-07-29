const { logError } = require("./errorHandler");
const bcrypt = require("bcrypt");
async function verifyPassword(password, hashedPassword) {
  console.log(password, hashedPassword);
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.log(err);
    logError("verification error", err);
    return { error: true };
  }
}

module.exports = { verifyPassword };
