const { getService } = require("../model/serviceModel");
const { verifyPassword } = require("../utils/passwordUtil");

async function serviceAccessValidator(req, res, next) {
  try {
    const serviceSecret = req.header("service_secret");
    if (!serviceSecret) {
      return res.status(401).json({ error: "FORBIDDEN 1" });
    }

    const { service_name, service_identifier } = req.query;
    if (!service_name || !service_identifier) {
      return res.status(401).json({
        error: "FORBIDDEN 2",
      });
    }

    const getServices = await getService(service_identifier, service_name);
    if (!getServices || getServices?.error === true) {
      return res.status(401).json({ error: "FORBIDDEN 3" });
    }
    console.log(getServices);
    const isVerified = await verifyPassword(
      serviceSecret,
      getServices.service_secret
    );
    if (!isVerified || isVerified?.error === true) {
      return res.status(401).json({ error: "FORBIDDEN 4" });
    }
    req.body.serviceId = getServices.service_id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
}

module.exports = { serviceAccessValidator };
