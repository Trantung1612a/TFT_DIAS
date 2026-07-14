const express = require("express");
const router = express.Router();
const { getChampions, getChampion, addChampion, editChampion, removeChampion } = require("../controller/champion.controller");

/**
 * @swagger
 * tags:
 *   name: Champions
 *   description: TFT Champion endpoints
 */

/**
 * @swagger
 * /api/champions:
 *   get:
 *     summary: Get all champions
 *     tags: [Champions]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: set
 *         schema: { type: string }
 *         description: Filter by set (e.g. "17")
 *       - in: query
 *         name: cost
 *         schema: { type: integer, minimum: 1, maximum: 5 }
 *         description: Filter by cost tier
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 100 }
 *     responses:
 *       200:
 *         description: List of champions
 */
router.get("/", getChampions);
router.post("/", addChampion);

/**
 * @swagger
 * /api/champions/{id}:
 *   get:
 *     summary: Get champion by ID
 *     tags: [Champions]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Champion detail
 *       404:
 *         description: Champion not found
 */
router.get("/:id", getChampion);
router.put("/:id", editChampion);
router.delete("/:id", removeChampion);

module.exports = router;
