const { getAllOrigins, getOriginById } = require("../services/origin.service");
const { sendSuccess, sendError } = require("../utils/response.util");

const getOrigins = async (req, res) => {
  try {
    const { set, search, page, limit } = req.query;
    const data = await getAllOrigins({ set, search, page, limit });
    return sendSuccess(res, data, "Origins fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getOrigin = async (req, res) => {
  try {
    const origin = await getOriginById(req.params.id);
    if (!origin) return sendError(res, "Origin not found", 404);
    return sendSuccess(res, origin, "Origin fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = { getOrigins, getOrigin };
