// TFT Set 17 Origins (Traits)
export const origins = [
  {
    name: "Dark Star",
    set: "17",
    description:
      "Dark Star champions gain bonus AP and AD. When a Dark Star champion dies, nearby Dark Star allies gain a permanent buff.",
    breakpoints: [
      { number: 3, effect: "+20 AP & AD for all Dark Star allies" },
      { number: 6, effect: "+50 AP & AD; fallen allies grant +15 bonus stacking forever" },
      { number: 9, effect: "+90 AP & AD; the bonus from fallen allies is tripled" },
    ],
    color: "from-purple-900 to-slate-900",
    border: "border-purple-700",
    dot: "bg-purple-500",
  },
  {
    name: "Space Groove",
    set: "17",
    description:
      "Space Groove champions vibe to the beat, granting shields and attack speed to the lowest-health ally each round.",
    breakpoints: [
      { number: 2, effect: "Lowest HP ally gains 15% Attack Speed" },
      { number: 4, effect: "Top 2 lowest HP allies gain 30% Attack Speed and 200 shield" },
      { number: 6, effect: "All allies gain 25% Attack Speed and 350 shield" },
      { number: 8, effect: "All allies gain 50% Attack Speed, 600 shield and 30 AP" },
    ],
    color: "from-pink-900 to-slate-900",
    border: "border-pink-600",
    dot: "bg-pink-500",
  },
  {
    name: "Primordian",
    set: "17",
    description:
      "Primordian champions are ancient warriors. They gain Armor and deal bonus physical damage based on their max HP.",
    breakpoints: [
      { number: 3, effect: "+40 Armor; deal 2% max HP as bonus physical damage" },
      { number: 6, effect: "+90 Armor; deal 5% max HP as bonus physical damage" },
      { number: 9, effect: "+150 Armor; deal 9% max HP as bonus physical damage" },
    ],
    color: "from-amber-900 to-slate-900",
    border: "border-amber-600",
    dot: "bg-amber-500",
  },
  {
    name: "Meeple",
    set: "17",
    description:
      "Meeple champions summon adorable Meeples that distract enemies and grant mana on takedowns.",
    breakpoints: [
      { number: 2, effect: "Summon 1 Meeple; +10 starting mana per takedown" },
      { number: 4, effect: "Summon 2 Meeples; +20 starting mana per takedown" },
      { number: 6, effect: "Summon 3 Meeples; +35 starting mana per takedown, Meeples become Elite" },
    ],
    color: "from-green-900 to-slate-900",
    border: "border-green-600",
    dot: "bg-green-500",
  },
  {
    name: "Psionic",
    set: "17",
    description:
      "Psionic champions channel psychic energy, reducing ability cooldowns for themselves and nearby allies.",
    breakpoints: [
      { number: 2, effect: "-15% ability cooldown for Psionic champions" },
      { number: 4, effect: "-25% ability cooldown for all allies within 2 hexes" },
      { number: 6, effect: "-40% ability cooldown for all allies; Psionic champions double-cast" },
    ],
    color: "from-cyan-900 to-slate-900",
    border: "border-cyan-600",
    dot: "bg-cyan-500",
  },
];
