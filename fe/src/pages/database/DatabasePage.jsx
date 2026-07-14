import { useState } from "react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import { origins } from "../../data/origins";
import { classes } from "../../data/classes";

// ── Breakpoint / Tier row ──────────────────────────────────────────────────
const BreakpointRow = ({ number, effect, dot }) => (
  <li className="flex items-start gap-2 text-xs">
    <div className="flex items-center gap-1 shrink-0 mt-0.5">
      {Array.from({ length: number }).map((_, i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      ))}
    </div>
    <span className="text-slate-300">{effect}</span>
  </li>
);

// ── Trait / Class card ──────────────────────────────────────────────────────
const TraitCard = ({ name, set, description, breakpoints, tiers, color, border, dot }) => {
  const points = breakpoints || tiers;
  const label  = breakpoints ? "Breakpoints" : "Tiers";
  const abbr   = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`rounded-xl border ${border} bg-gradient-to-br ${color} p-5 flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded border ${border} flex items-center justify-center text-[11px] font-bold text-slate-100 shrink-0`}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          {abbr}
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">{name}</p>
          <span className="text-[10px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">Set {set}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs leading-relaxed">{description}</p>

      {/* Breakpoints / Tiers */}
      <div>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
        <ul className="space-y-1.5">
          {points.map((bp) => (
            <BreakpointRow key={bp.number} {...bp} dot={dot} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── Tab button ──────────────────────────────────────────────────────────────
const Tab = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
      active
        ? "text-white border-orange-500 bg-slate-800/40"
        : "text-slate-400 border-transparent hover:text-white"
    }`}
  >
    {label}
    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${active ? "bg-orange-500/20 text-orange-300" : "bg-slate-700 text-slate-500"}`}>
      {count}
    </span>
  </button>
);

// ── Page ────────────────────────────────────────────────────────────────────
const DatabasePage = () => {
  const [tab, setTab] = useState("origins");

  const items  = tab === "origins" ? origins : classes;
  const isOrig = tab === "origins";

  return (
    <div className="min-h-screen flex flex-col bg-[#0b141d]">
      <TFTHeader />

      <main className="flex-1 px-8 py-6 max-w-screen-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-1">Database</h1>
        <p className="text-slate-400 text-sm mb-6">Set 17 · Origins &amp; Classes reference</p>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-800 mb-8">
          <Tab
            label="Origins"
            count={origins.length}
            active={tab === "origins"}
            onClick={() => setTab("origins")}
          />
          <Tab
            label="Classes"
            count={classes.length}
            active={tab === "classes"}
            onClick={() => setTab("classes")}
          />
        </div>

        {/* Section heading */}
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">
          {isOrig
            ? "Origins grant bonuses when you field enough champions sharing the same origin."
            : "Classes grant bonuses based on how many champions share the same class."}
        </p>

        {/* Grid — 3 columns */}
        <div className="grid grid-cols-3 gap-5">
          {items.map((item) => (
            <TraitCard key={item.name} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DatabasePage;
