// errorHandler.js
const Sentry = require("@sentry/node");

function logError(context, error) {
  const errorDetails = {
    context,
    timestamp: new Date().toISOString(),
  };

  if (error?.response) {
    errorDetails.status = error.response.status;
    errorDetails.headers = error.response.headers;
    errorDetails.data = error.response.data;
  } else {
    errorDetails.message = error?.message;
    errorDetails.stack = error?.stack;
  }

  Sentry.withScope((scope) => {
    scope.setTag("context", context);
    scope.setExtra("details", errorDetails);
    Sentry.captureException(error);
  });
}

module.exports = { logError };
