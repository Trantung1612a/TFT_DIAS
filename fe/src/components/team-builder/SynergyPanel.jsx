import { useMemo } from "react";
import { origins } from "../../data/origins";
import { classes } from "../../data/classes";

// ─── Trait tier thresholds ────────────────────────────────────────────────────
function getTraitTier(traitData, count) {
  const bps = traitData.breakpoints || traitData.tiers || [];
  const active = bps.filter((bp) => count >= bp.number);
  if (active.length === 0) return null; // inactive
  const tierMap = ["bronze", "silver", "gold", "prismatic"];
  return tierMap[Math.min(active.length - 1, 3)];
}

function getNextBreakpoint(traitData, count) {
  const bps = traitData.breakpoints || traitData.tiers || [];
  const next = bps.find((bp) => bp.number > count);
  return next ? next.number : null;
}

const TIER_STYLES = {
  bronze: {
    bg: "bg-amber-900/70",
    border: "border-amber-700",
    text: "text-amber-200",
    badge: "bg-amber-700 text-amber-100",
    hex: "from-amber-800 to-amber-900",
    label: "Bronze",
  },
  silver: {
    bg: "bg-slate-600/60",
    border: "border-slate-400",
    text: "text-slate-100",
    badge: "bg-slate-500 text-slate-100",
    hex: "from-slate-500 to-slate-700",
    label: "Silver",
  },
  gold: {
    bg: "bg-yellow-900/70",
    border: "border-yellow-500",
    text: "text-yellow-200",
    badge: "bg-yellow-600 text-yellow-100",
    hex: "from-yellow-700 to-yellow-900",
    label: "Gold",
  },
  prismatic: {
    bg: "bg-purple-900/70",
    border: "border-purple-500",
    text: "text-purple-200",
    badge: "bg-purple-600 text-purple-100",
    hex: "from-purple-700 to-purple-900",
    label: "Prismatic",
  },
};

// ─── Hexagon icon ─────────────────────────────────────────────────────────────
const HexIcon = ({ abbr, tier }) => {
  const style = tier ? TIER_STYLES[tier] : null;
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center text-[9px] font-black shrink-0 ${
        style
          ? `bg-gradient-to-b ${style.hex} border border-opacity-60`
          : "bg-slate-800 border border-slate-700"
      } text-white`}
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      {abbr}
    </div>
  );
};

// ─── Progress bar dots ────────────────────────────────────────────────────────
const BreakpointDots = ({ bps, count, tier }) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {bps.map((bp, i) => {
        const filled = count >= bp.number;
        const isCurrent = bps.filter((b) => count >= b.number).length - 1 === i;
        return (
          <div
            key={bp.number}
            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold border ${
              filled
                ? isCurrent && tier
                  ? `${TIER_STYLES[tier].badge} ${TIER_STYLES[tier].border}`
                  : "bg-slate-700 border-slate-600 text-slate-300"
                : "bg-slate-900 border-slate-800 text-slate-600"
            }`}
          >
            {bp.number}
          </div>
        );
      })}
    </div>
  );
};

// ─── Single trait row ─────────────────────────────────────────────────────────
const TraitRow = ({ traitData, count, tier, type }) => {
  const bps = traitData.breakpoints || traitData.tiers || [];
  const next = getNextBreakpoint(traitData, count);
  const style = tier ? TIER_STYLES[tier] : null;
  const abbr = traitData.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg border transition-all ${
        style
          ? `${style.bg} ${style.border}`
          : "bg-slate-900/60 border-slate-800"
      }`}
    >
      <HexIcon abbr={abbr} tier={tier} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold truncate ${style ? style.text : "text-slate-500"}`}>
            {traitData.name}
          </span>
          <span
            className={`text-[9px] px-1 rounded shrink-0 ${
              type === "origin"
                ? "bg-blue-900/50 text-blue-400 border border-blue-800"
                : "bg-purple-900/50 text-purple-400 border border-purple-800"
            }`}
          >
            {type === "origin" ? "Origin" : "Class"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold ${style ? style.text : "text-slate-600"}`}>
            {count}
          </span>
          <BreakpointDots bps={bps} count={count} tier={tier} />
          {next && (
            <span className="text-[9px] text-slate-600 ml-auto shrink-0">
              +{next - count} for next
            </span>
          )}
        </div>
      </div>

      {tier && (
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${TIER_STYLES[tier].badge}`}>
          {TIER_STYLES[tier].label}
        </span>
      )}
    </div>
  );
};

// ─── Main Synergy Panel ───────────────────────────────────────────────────────
const SynergyPanel = ({ boardChamps }) => {
  const activeCounts = useMemo(() => {
    const counts = {};
    boardChamps.forEach((champ) => {
      if (!champ) return;
      if (champ.origin) counts[champ.origin] = (counts[champ.origin] || 0) + 1;
      if (champ.cls) counts[champ.cls] = (counts[champ.cls] || 0) + 1;
    });
    return counts;
  }, [boardChamps]);

  const traitRows = useMemo(() => {
    const rows = [];

    origins.forEach((o) => {
      const count = activeCounts[o.name] || 0;
      if (count === 0) return;
      const tier = getTraitTier(o, count);
      rows.push({ traitData: o, count, tier, type: "origin" });
    });

    classes.forEach((c) => {
      const count = activeCounts[c.name] || 0;
      if (count === 0) return;
      const tier = getTraitTier(c, count);
      rows.push({ traitData: c, count, tier, type: "class" });
    });

    // Sort: active tiers first (prismatic > gold > silver > bronze > null), then by count desc
    const tierOrder = { prismatic: 4, gold: 3, silver: 2, bronze: 1, null: 0 };
    rows.sort((a, b) => {
      const ta = tierOrder[a.tier] || 0;
      const tb = tierOrder[b.tier] || 0;
      if (tb !== ta) return tb - ta;
      return b.count - a.count;
    });

    return rows;
  }, [activeCounts]);

  const champCount = boardChamps.filter(Boolean).length;
  const activeTraitCount = traitRows.filter((r) => r.tier).length;

  return (
    <div className="bg-[#0f1b27] border border-slate-800 rounded-xl p-4 w-64 shrink-0">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white font-bold text-sm">Synergies</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-slate-400 text-xs">
            {champCount}/9 champions
          </span>
          {activeTraitCount > 0 && (
            <span className="text-orange-400 text-xs font-medium">
              · {activeTraitCount} traits active
            </span>
          )}
        </div>
      </div>

      {/* Traits */}
      {traitRows.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Đặt champions lên board để xem trait synergies
          </p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          {traitRows.map((row) => (
            <TraitRow key={`${row.type}-${row.traitData.name}`} {...row} />
          ))}
        </div>
      )}

      {/* Legend */}
      {traitRows.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider mb-2">Tier</p>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(TIER_STYLES).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${val.badge}`} />
                <span className="text-[10px] text-slate-500">{val.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SynergyPanel;
