const Class = require("../models/class.model");

const getAllClasses = async ({ set, search, page = 1, limit = 50 }) => {
  const filter = {};
  if (set)    filter.set  = set;
  if (search) filter.name = { $regex: search, $options: "i" };

  const [classes, total] = await Promise.all([
    Class.find(filter).sort({ name: 1 }).skip((page - 1) * limit).limit(limit),
    Class.countDocuments(filter),
  ]);
  return { classes, total, page: Number(page), limit: Number(limit) };
};

const getClassById = async (id) => Class.findById(id);

module.exports = { getAllClasses, getClassById };
