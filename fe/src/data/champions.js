// Hardcoded TFT Set 17 champion list
// cost: 1-5 (determines border/rarity colour)
const ch = (name, cost, origin, cls) => ({ name, cost, origin, cls });

export const champions = [
  // ── 1-cost ──────────────────────────────────────────────────────────────
  ch("Chogath",      1, "Dark Star",      "Bastion"),
  ch("Gragas",       1, "Space Groove",   "Bastion"),
  ch("Gnar",         1, "Meeple",         "Duelist"),
  ch("Poppy",        1, "Meeple",         "Bastion"),
  ch("Vi",           1, "Psionic",        "Duelist"),
  ch("Twisted Fate", 1, "Dark Star",      "Gunner"),
  ch("Briar",        1, "Primordian",     "Duelist"),
  ch("Nami",         1, "Space Groove",   "Invoker"),
  ch("Renekton",     1, "Primordian",     "Bastion"),
  ch("Urgot",        1, "Psionic",        "Gunner"),

  // ── 2-cost ──────────────────────────────────────────────────────────────
  ch("Karma",        2, "Dark Star",      "Invoker"),
  ch("Tahm Kench",   2, "Space Groove",   "Bastion"),
  ch("Meeple",       2, "Meeple",         "Invoker"),
  ch("Riven",        2, "Space Groove",   "Duelist"),
  ch("RekSai",       2, "Primordian",     "Bastion"),
  ch("Yasuo",        2, "Dark Star",      "Duelist"),
  ch("Milio",        2, "Meeple",         "Invoker"),
  ch("Rammus",       2, "Primordian",     "Bastion"),
  ch("Zed",          2, "Dark Star",      "Duelist"),
  ch("Syndra",       2, "Psionic",        "Invoker"),

  // ── 3-cost ──────────────────────────────────────────────────────────────
  ch("Thresh",       3, "Dark Star",      "Bastion"),
  ch("Ornn",         3, "Space Groove",   "Bastion"),
  ch("Jax",          3, "Primordian",     "Duelist"),
  ch("Maokai",       3, "Primordian",     "Bastion"),
  ch("Flora",        3, "Meeple",         "Invoker"),
  ch("Akali",        3, "Psionic",        "Duelist"),
  ch("Bard",         3, "Dark Star",      "Invoker"),
  ch("Lux",          3, "Space Groove",   "Gunner"),
  ch("Jinx",         3, "Psionic",        "Gunner"),
  ch("Leona",        3, "Primordian",     "Bastion"),

  // ── 4-cost ──────────────────────────────────────────────────────────────
  ch("Gwen",         4, "Space Groove",   "Duelist"),
  ch("Pantheon",     4, "Space Groove",   "Bastion"),
  ch("Mordekaiser",  4, "Dark Star",      "Bastion"),
  ch("Kaisa",        4, "Dark Star",      "Gunner"),
  ch("Belveth",      4, "Primordian",     "Duelist"),
  ch("Blitzcrank",   4, "Space Groove",   "Bastion"),
  ch("Kindred",      4, "Primordian",     "Gunner"),
  ch("Master Yi",    4, "Psionic",        "Duelist"),
  ch("Ahri",         4, "Dark Star",      "Invoker"),
  ch("Aatrox",       4, "Primordian",     "Duelist"),

  // ── 5-cost ──────────────────────────────────────────────────────────────
  ch("Shen",         5, "Space Groove",   "Bastion"),
  ch("Aurelion Sol", 5, "Dark Star",      "Invoker"),
  ch("Jhin",         5, "Dark Star",      "Gunner"),
  ch("Rhaast",       5, "Primordian",     "Duelist"),
  ch("Lulu",         5, "Meeple",         "Invoker"),
  ch("Jayce",        5, "Psionic",        "Duelist"),
  ch("Viego",        5, "Dark Star",      "Duelist"),
  ch("Heimerdinger", 5, "Space Groove",   "Invoker"),
];

export const COSTS = [1, 2, 3, 4, 5];
