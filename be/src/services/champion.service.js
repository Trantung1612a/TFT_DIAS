const Champion = require("../models/champion.model");

const getAllChampions = async ({ set, cost, search, page = 1, limit = 100 }) => {
  const filter = {};
  if (set)    filter.set  = set;
  if (cost)   filter.cost = Number(cost);
  if (search) filter.name = { $regex: search, $options: "i" };

  const [champions, total] = await Promise.all([
    Champion.find(filter)
      .populate("origin", "name")
      .populate("class",  "name")
      .sort({ cost: 1, name: 1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Champion.countDocuments(filter),
  ]);

  return { champions, total, page: Number(page), limit: Number(limit) };
};

const getChampionById = async (id) => {
  return Champion.findById(id)
    .populate("origin")
    .populate("class")
    .populate("items");
};

module.exports = { getAllChampions, getChampionById };
