const express = require("express");
const router = express.Router();
const { getClasses, getClass } = require("../controller/class.controller");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: TFT Class endpoints
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: set
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of classes
 */
router.get("/",    getClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Class detail
 */
router.get("/:id", getClass);

module.exports = router;
