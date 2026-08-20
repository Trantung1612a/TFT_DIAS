import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Star, TrendingUp, TrendingDown } from "lucide-react";
import CompDetail from "./CompDetail";

// Tag styles – Mythic Archives palette
const TAG_STYLES = {
  fast:    { bg: "rgba(10,200,185,0.1)",  border: "rgba(10,200,185,0.3)",  text: "#0AC8B9" },
  emblem:  { bg: "rgba(168,104,196,0.12)", border: "rgba(168,104,196,0.35)", text: "#C87EE0" },
  slow:    { bg: "rgba(200,155,60,0.1)",  border: "rgba(200,155,60,0.35)", text: "#C89B3C" },
  augment: { bg: "rgba(232,184,75,0.1)",  border: "rgba(232,184,75,0.3)",  text: "#E8B84B" },
};

// Champion cost border colours – keeping game colours
const COST_BORDER = {
  1: "#6B7280",
  2: "#22C55E",
  3: "#3B82F6",
  4: "#D946EF",
  5: "#C89B3C",
};

// Tier badge config
const TIER_CONFIG = {
  S: { bg: "linear-gradient(135deg, #C89B3C 0%, #E8B84B 50%, #8A6B28 100%)", shadow: "0 0 16px rgba(200,155,60,0.5)", text: "#0B0C10" },
  A: { bg: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",              shadow: "0 0 12px rgba(34,197,94,0.4)",  text: "#0B0C10" },
  B: { bg: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",              shadow: "0 0 12px rgba(59,130,246,0.4)", text: "#fff" },
  C: { bg: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)",              shadow: "0 0 8px rgba(107,114,128,0.3)", text: "#fff" },
};

const ChampionAvatar = ({ name, cost, stars }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const borderColor = COST_BORDER[cost] || "#6B7280";
  return (
    <div className="flex flex-col items-center gap-1 w-14 shrink-0">
      <div className="relative">
        {stars && (
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex gap-px">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={7} style={{ color: "#C89B3C", fill: "#C89B3C" }} />
            ))}
          </div>
        )}
        <div
          className="w-11 h-11 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200"
          style={{
            border: `2px solid ${borderColor}`,
            background: "#0B0C10",
            color: "#F0E6D2",
            boxShadow: `0 0 6px ${borderColor}40`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 14px ${borderColor}80`;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 6px ${borderColor}40`;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {initials}
        </div>
      </div>
      <span
        className="text-[10px] text-center truncate w-14"
        style={{ color: "#A89880", fontFamily: "'Inter', sans-serif" }}
      >
        {name}
      </span>
    </div>
  );
};

const CompRow = ({ comp }) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !!comp.detail;
  const tierCfg = TIER_CONFIG[comp.tier] || TIER_CONFIG.C;

  return (
    <div
      className="rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: "#13151F",
        border: expanded
          ? "1px solid rgba(200,155,60,0.4)"
          : "1px solid rgba(200,155,60,0.12)",
        boxShadow: expanded ? "0 0 24px rgba(200,155,60,0.12)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!expanded) {
          e.currentTarget.style.borderColor = "rgba(200,155,60,0.3)";
          e.currentTarget.style.boxShadow = "0 0 16px rgba(200,155,60,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!expanded) {
          e.currentTarget.style.borderColor = "rgba(200,155,60,0.12)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* ── Summary row ── */}
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Tier badge */}
        <div className="relative shrink-0">
          {comp.trend === "up" && (
            <TrendingUp
              size={11}
              className="absolute -top-2 -left-1"
              style={{ color: "#0AC8B9" }}
            />
          )}
          {comp.trend === "down" && (
            <TrendingDown
              size={11}
              className="absolute -top-2 -left-1"
              style={{ color: "#8C1616" }}
            />
          )}
          <div
            className="w-9 h-9 rounded flex items-center justify-center font-bold text-sm"
            style={{
              background: tierCfg.bg,
              boxShadow: tierCfg.shadow,
              color: tierCfg.text,
              fontFamily: "'Cinzel', Georgia, serif",
            }}
          >
            {comp.tier}
          </div>
        </div>

        {/* Name + tags */}
        <div className="w-52 shrink-0">
          <p
            className="font-semibold text-sm leading-tight"
            style={{ color: "#F0E6D2", fontFamily: "'Inter', sans-serif" }}
          >
            {comp.name}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {comp.tags.map((tag) => {
              const s = TAG_STYLES[tag.type] || TAG_STYLES.augment;
              return (
                <span
                  key={tag.label}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    color: s.text,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {tag.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Champion icons */}
        <div className="flex gap-2 flex-1 overflow-x-auto py-1">
          {comp.champions.map((champ) => (
            <ChampionAvatar key={champ.name} {...champ} />
          ))}
        </div>

        {/* Actions */}
        <button
          className="shrink-0 p-1 transition-colors duration-200"
          style={{ color: "#5C5040" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C89B3C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5C5040")}
        >
          <Copy size={15} />
        </button>
        <button
          className="shrink-0 p-1 transition-colors duration-200"
          style={{
            color: hasDetail ? "#A89880" : "#2E2A1E",
            cursor: hasDetail ? "pointer" : "default",
          }}
          onMouseEnter={(e) => {
            if (hasDetail) e.currentTarget.style.color = "#C89B3C";
          }}
          onMouseLeave={(e) => {
            if (hasDetail) e.currentTarget.style.color = "#A89880";
          }}
          onClick={() => hasDetail && setExpanded((v) => !v)}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* ── Detail panel ── */}
      {expanded && hasDetail && <CompDetail detail={comp.detail} />}
    </div>
  );
};

export default CompRow;
