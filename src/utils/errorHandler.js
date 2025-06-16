// errorHandler.js
const Sentry = require("@sentry/node");

function logError(context, error) {
  const errorDetails = {
    context,
    timestamp: new Date().toISOString(),
  };

  if (error.response) {
    errorDetails.status = error.response.status;
    errorDetails.headers = error.response.headers;
    errorDetails.data = error.response.data;
  } else {
    errorDetails.message = error.message;
    errorDetails.stack = error.stack;
  }

  // Local log for debugging (optional in production)
  console.error(JSON.stringify(errorDetails, null, 2));

  // Capture error in Sentry with context
  Sentry.withScope((scope) => {
    scope.setTag("context", context);
    scope.setExtra("details", errorDetails);
    Sentry.captureException(error);
  });
}

module.exports = { logError };
