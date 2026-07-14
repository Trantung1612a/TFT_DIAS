const express = require("express");
const router = express.Router();
const { getOrigins, getOrigin } = require("../controller/origin.controller");

/**
 * @swagger
 * tags:
 *   name: Origins
 *   description: TFT Origin (trait) endpoints
 */

/**
 * @swagger
 * /api/origins:
 *   get:
 *     summary: Get all origins
 *     tags: [Origins]
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
 *         description: List of origins
 */
router.get("/",    getOrigins);

/**
 * @swagger
 * /api/origins/{id}:
 *   get:
 *     summary: Get origin by ID
 *     tags: [Origins]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Origin detail
 */
router.get("/:id", getOrigin);

module.exports = router;
