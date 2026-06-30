// Cost color mapping (TFT convention): 1=gray 2=green 3=blue 4=pink 5=gold
const c = (name, cost, stars) => ({ name, cost, stars });

export const teamComps = [
  {
    tier: "S",
    trend: "up",
    name: "Space Groove Replicators",
    tags: [
      { label: "Fast 8", type: "fast" },
      { label: "Emblem", type: "emblem" },
    ],
    champions: [
      c("Gwen", 4),
      c("Pantheon", 1),
      c("Ornn", 3),
      c("Nami", 1),
      c("Riven", 2),
      c("Tahm Kench", 2),
      c("Blitzcrank", 4),
      c("Shen", 5),
    ],
  },
  {
    tier: "S",
    name: "Dark Stars",
    tags: [
      { label: "Fast 8", type: "fast" },
      { label: "Emblem", type: "emblem" },
    ],
    champions: [
      c("Chogath", 1),
      c("Mordekaiser", 4),
      c("Kaisa", 4),
      c("Aurelion Sol", 5),
      c("Karma", 2),
      c("Tahm Kench", 2),
      c("Thresh", 3),
      c("Jhin", 5),
    ],
  },
  {
    tier: "S",
    name: "Meeple Voyagers",
    tags: [{ label: "Slow Roll (6)", type: "slow" }],
    champions: [
      c("Poppy", 1),
      c("Gnar", 1, 3),
      c("Meeple", 2),
      c("Karma", 2),
      c("Rammus", 3),
      c("Thresh", 3),
      c("Bard", 4),
      c("Jhin", 5),
    ],
  },
  {
    tier: "S",
    name: "Primordian Challengers",
    tags: [{ label: "Slow Roll (6)", type: "slow" }],
    champions: [
      c("Briar", 1),
      c("RekSai", 2),
      c("Akali", 3, 3),
      c("Belveth", 4, 3),
      c("Jinx", 4, 3),
      c("Maokai", 3),
      c("Rhaast", 5, 3),
      c("Kindred", 5, 3),
    ],
  },
  {
    tier: "S",
    name: "Psionic Marauders",
    tags: [{ label: "Fast 8", type: "fast" }],
    champions: [
      c("Belveth", 4),
      c("Gragas", 1),
      c("Maokai", 3),
      c("Urgot", 2),
      c("Kindred", 5),
      c("Master Yi", 4),
      c("Tahm Kench", 2),
      c("Flora", 3),
    ],
  },
  {
    tier: "S",
    name: "Reach For The Stars",
    tags: [
      { label: "Slow Roll (7)", type: "slow" },
      { label: "Augment", type: "augment" },
    ],
    champions: [
      c("Aatrox", 4, 3),
      c("Twisted Fate", 1),
      c("Jax", 3, 3),
      c("Milio", 1),
      c("Pantheon", 1),
      c("Lulu", 4, 3),
      c("Maokai", 3, 3),
      c("Rhaast", 5, 3),
    ],
  },
  {
    tier: "S",
    name: "Self Destruct",
    tags: [
      { label: "Slow Roll (6)", type: "slow" },
      { label: "Augment", type: "augment" },
    ],
    champions: [
      c("Renekton", 2),
      c("Vi", 1),
      c("Zed", 4),
      c("Yasuo", 4),
      c("Ahri", 4),
      c("Lux", 3),
      c("Akali", 3),
      c("Jinx", 4),
    ],
  },
];

export const filterGroups = ["Standard", "Slow Roll", "Fast 8/9", "Emblem", "Augment"];
