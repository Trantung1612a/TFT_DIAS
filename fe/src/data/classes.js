// TFT Set 17 Classes
export const classes = [
  {
    name: "Bastion",
    set: "17",
    description:
      "Bastions are frontline tanks. They gain bonus Armor and Magic Resistance, scaling with the number of Bastions on your board.",
    tiers: [
      { number: 2, effect: "+30 Armor & MR" },
      { number: 4, effect: "+75 Armor & MR" },
      { number: 6, effect: "+150 Armor & MR; take 15% reduced damage" },
      { number: 8, effect: "+250 Armor & MR; immune to the first crowd control each combat" },
    ],
    color: "from-blue-900 to-slate-900",
    border: "border-blue-600",
    dot: "bg-blue-500",
  },
  {
    name: "Duelist",
    set: "17",
    description:
      "Duelists gain stacking Attack Speed on each attack. The faster they fight, the deadlier they become.",
    tiers: [
      { number: 2, effect: "+6% Attack Speed per stack (max 6 stacks)" },
      { number: 4, effect: "+9% Attack Speed per stack (max 8 stacks)" },
      { number: 6, effect: "+12% Attack Speed per stack (max 10 stacks); +15% Crit Chance" },
      { number: 8, effect: "+16% Attack Speed per stack (no cap); +25% Crit Chance" },
    ],
    color: "from-red-900 to-slate-900",
    border: "border-red-600",
    dot: "bg-red-500",
  },
  {
    name: "Gunner",
    set: "17",
    description:
      "Gunners deal increased damage with their basic attacks, amplified further by each Gunner on the board.",
    tiers: [
      { number: 2, effect: "+12% bonus Attack Damage" },
      { number: 4, effect: "+30% bonus Attack Damage" },
      { number: 6, effect: "+55% bonus Attack Damage; attacks pierce through enemies" },
    ],
    color: "from-orange-900 to-slate-900",
    border: "border-orange-600",
    dot: "bg-orange-500",
  },
  {
    name: "Invoker",
    set: "17",
    description:
      "Invokers empower the team's magic. They grant bonus Ability Power and mana regeneration to the lowest-mana ally each second.",
    tiers: [
      { number: 2, effect: "+15 AP; restore 3 mana/sec to lowest-mana ally" },
      { number: 4, effect: "+35 AP; restore 6 mana/sec to two lowest-mana allies" },
      { number: 6, effect: "+65 AP; restore 10 mana/sec to all allies; abilities deal 10% more damage" },
    ],
    color: "from-violet-900 to-slate-900",
    border: "border-violet-600",
    dot: "bg-violet-500",
  },
];
