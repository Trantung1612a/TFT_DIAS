const { getAllChampions, getChampionById } = require("../services/champion.service");
const { sendSuccess, sendError } = require("../utils/response.util");

const getChampions = async (req, res) => {
  try {
    const { set, cost, search, page, limit } = req.query;
    const data = await getAllChampions({ set, cost, search, page, limit });
    return sendSuccess(res, data, "Champions fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getChampion = async (req, res) => {
  try {
    const champion = await getChampionById(req.params.id);
    if (!champion) return sendError(res, "Champion not found", 404);
    return sendSuccess(res, champion, "Champion fetched");
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = { getChampions, getChampion };
