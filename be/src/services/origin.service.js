const Origin = require("../models/origin.model");

const getAllOrigins = async ({ set, search, page = 1, limit = 50 }) => {
  const filter = {};
  if (set)    filter.set  = set;
  if (search) filter.name = { $regex: search, $options: "i" };

  const [origins, total] = await Promise.all([
    Origin.find(filter).sort({ name: 1 }).skip((page - 1) * limit).limit(limit),
    Origin.countDocuments(filter),
  ]);
  return { origins, total, page: Number(page), limit: Number(limit) };
};

const getOriginById = async (id) => Origin.findById(id);

module.exports = { getAllOrigins, getOriginById };
