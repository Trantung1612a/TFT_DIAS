import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Star, TrendingUp } from "lucide-react";
import CompDetail from "./CompDetail";

const TAG_STYLES = {
  fast:    "bg-blue-900/50 text-blue-300 border border-blue-800",
  emblem:  "bg-purple-900/50 text-purple-300 border border-purple-800",
  slow:    "bg-cyan-900/50 text-cyan-300 border border-cyan-800",
  augment: "bg-amber-900/50 text-amber-300 border border-amber-800",
};

const COST_BORDER = {
  1: "border-slate-400",
  2: "border-green-500",
  3: "border-blue-500",
  4: "border-fuchsia-500",
  5: "border-amber-400",
};

const ChampionAvatar = ({ name, cost, stars }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1 w-16 shrink-0">
      <div className="relative">
        {stars && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={8} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        )}
        <div className={`w-12 h-12 rounded-md border-2 ${COST_BORDER[cost]} bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-200`}>
          {initials}
        </div>
      </div>
      <span className="text-[11px] text-slate-400 text-center truncate w-16">{name}</span>
    </div>
  );
};

const CompRow = ({ comp }) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !!comp.detail;

  return (
    <div className={`border border-slate-800 rounded-lg overflow-hidden transition-colors ${expanded ? "bg-slate-900" : "bg-slate-900/60"}`}>
      {/* ── Summary row ── */}
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Tier badge */}
        <div className="relative shrink-0">
          {comp.trend === "up" && (
            <TrendingUp size={12} className="absolute -top-2 -left-1 text-green-400" />
          )}
          <div className="w-9 h-9 rounded bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center font-bold text-white text-sm">
            {comp.tier}
          </div>
        </div>

        {/* Name + tags */}
        <div className="w-56 shrink-0">
          <p className="text-white font-semibold text-sm leading-tight">{comp.name}</p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {comp.tags.map((tag) => (
              <span key={tag.label} className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${TAG_STYLES[tag.type]}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Champion icons */}
        <div className="flex gap-2 flex-1 overflow-x-auto py-1">
          {comp.champions.map((champ) => (
            <ChampionAvatar key={champ.name} {...champ} />
          ))}
        </div>

        {/* Actions */}
        <button className="shrink-0 text-slate-500 hover:text-slate-300 p-1">
          <Copy size={16} />
        </button>
        <button
          className={`shrink-0 p-1 transition-colors ${hasDetail ? "text-slate-400 hover:text-white cursor-pointer" : "text-slate-700 cursor-default"}`}
          onClick={() => hasDetail && setExpanded((v) => !v)}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* ── Detail panel (animated) ── */}
      {expanded && hasDetail && <CompDetail detail={comp.detail} />}
    </div>
  );
};

export default CompRow;
