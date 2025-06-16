const Sentry = require("@sentry/node");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://c8feed891e60021dc17891555923e9b1@o4509507672932352.ingest.de.sentry.io/4509507676930128",
    sendDefaultPii: true,
    environment: "production",
  });
} else {
  Sentry.init({
    dsn: "",
    enabled: false,
    environment: process.env.NODE_ENV || "development",
  });
}
