const { getAllChampions, getChampionById, createChampion, updateChampion, deleteChampion } = require("../services/champion.service");
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

const addChampion = async (req, res) => {
  try {
    const champion = await createChampion(req.body);
    return sendSuccess(res, champion, "Champion created", 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const editChampion = async (req, res) => {
  try {
    const champion = await updateChampion(req.params.id, req.body);
    if (!champion) return sendError(res, "Champion not found", 404);
    return sendSuccess(res, champion, "Champion updated");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const removeChampion = async (req, res) => {
  try {
    const champion = await deleteChampion(req.params.id);
    if (!champion) return sendError(res, "Champion not found", 404);
    return sendSuccess(res, null, "Champion deleted");
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = { getChampions, getChampion, addChampion, editChampion, removeChampion };
