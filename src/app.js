require("./sentry/instruments.js");

const Sentry = require("@sentry/node");
const express = require("express");
const app = express();
app.use(express.json());

const sendMessage = require("./routes/waRoute.js");
app.use("/api/v1", sendMessage);
Sentry.setupExpressErrorHandler(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
