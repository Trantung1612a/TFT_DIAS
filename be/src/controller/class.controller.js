const { getAllClasses, getClassById } = require("../services/class.service");
const { sendSuccess, sendError } = require("../utils/response.util");

const getClasses = async (req, res) => {
  try {
    const { set, search, page, limit } = req.query;
    const data = await getAllClasses({ set, search, page, limit });
    return sendSuccess(res, data, "Classes fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getClass = async (req, res) => {
  try {
    const cls = await getClassById(req.params.id);
    if (!cls) return sendError(res, "Class not found", 404);
    return sendSuccess(res, cls, "Class fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = { getClasses, getClass };
