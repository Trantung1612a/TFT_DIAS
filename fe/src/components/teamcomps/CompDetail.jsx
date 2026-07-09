import { ChevronRight } from "lucide-react";

// ─── Cost border colours ────────────────────────────────────────────────────
const COST_BORDER = { 1: "border-slate-400", 2: "border-green-500", 3: "border-blue-500", 4: "border-fuchsia-500", 5: "border-amber-400" };
const COST_BG    = { 1: "bg-slate-700",     2: "bg-green-950",     3: "bg-blue-950",     4: "bg-fuchsia-950",    5: "bg-amber-950" };

// ─── Trait tier colours ─────────────────────────────────────────────────────
const TRAIT_TIER = {
  bronze:    { hex: "bg-amber-900/60 border-amber-700",   text: "text-amber-300" },
  silver:    { hex: "bg-slate-500/60 border-slate-300",   text: "text-slate-200" },
  gold:      { hex: "bg-yellow-600/60 border-yellow-400", text: "text-yellow-300" },
  prismatic: { hex: "bg-purple-600/60 border-purple-400", text: "text-purple-200" },
};

// ─── Small champion avatar ───────────────────────────────────────────────────
const MiniChamp = ({ name, cost, size = "w-11 h-11" }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`${size} rounded border-2 ${COST_BORDER[cost]} ${COST_BG[cost]} flex items-center justify-center text-[10px] font-bold text-slate-200 shrink-0`}>
      {initials}
    </div>
  );
};

// ─── Hexagonal trait badge ───────────────────────────────────────────────────
const TraitHex = ({ name, count, tier }) => {
  const { hex, text } = TRAIT_TIER[tier] || TRAIT_TIER.bronze;
  const abbr = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="flex items-center gap-1.5">
      {/* Hexagon shape via clip-path */}
      <div
        className={`w-9 h-9 border ${hex} flex items-center justify-center text-[9px] font-bold ${text} shrink-0`}
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        {abbr}
      </div>
      {/* Count badge */}
      <span className={`text-[11px] font-bold ${text} bg-slate-800/60 rounded px-1 min-w-[18px] text-center`}>
        {count}
      </span>
      <span className="text-[11px] text-slate-400 truncate max-w-[72px]">{name}</span>
    </div>
  );
};

// ─── Item icon ───────────────────────────────────────────────────────────────
const ItemIcon = ({ name, color }) => {
  const abbr = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div title={name} className={`w-9 h-9 rounded ${color || "bg-slate-700"} border border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-200 shrink-0`}>
      {abbr}
    </div>
  );
};

// ─── TFT Hex positioning board ───────────────────────────────────────────────
const BOARD_ROWS = 4;
const BOARD_COLS = 7;
const HEX_W = 40;
const HEX_H = 36; // vertical step for pointy-top hexes (HEX_W * 0.866 ≈ 34.6)
const HEX_OFFSET = HEX_W / 2; // odd-row indent

const HexBoard = ({ positions }) => {
  // Build lookup: "row-col" → champion
  const placed = {};
  positions.forEach((p) => { placed[`${p.row}-${p.col}`] = p; });

  const boardW = BOARD_COLS * HEX_W + HEX_OFFSET;
  const boardH = BOARD_ROWS * HEX_H + 8;

  return (
    <div className="relative" style={{ width: boardW, height: boardH }}>
      {Array.from({ length: BOARD_ROWS }).map((_, row) =>
        Array.from({ length: BOARD_COLS }).map((_, col) => {
          const key = `${row}-${col}`;
          const champ = placed[key];
          // Odd rows (1,3) offset right by half hex
          const x = col * HEX_W + (row % 2 === 1 ? HEX_OFFSET : 0);
          const y = row * HEX_H;

          return (
            <div
              key={key}
              className="absolute"
              style={{ left: x, top: y, width: HEX_W - 4, height: HEX_W - 4 }}
            >
              {champ ? (
                // Occupied hex — show champion
                <div
                  className={`w-full h-full border-2 ${COST_BORDER[champ.cost]} ${COST_BG[champ.cost]} flex items-center justify-center text-[9px] font-bold text-slate-200`}
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  title={champ.name}
                >
                  {champ.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              ) : (
                // Empty hex
                <div
                  className="w-full h-full bg-slate-800/50 border border-slate-700/50"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

// ─── Main detail panel ───────────────────────────────────────────────────────
const CompDetail = ({ detail }) => {
  const { earlyComp, traits, carousel, options, positioning } = detail;

  return (
    <div className="border-t border-slate-800 bg-[#0b1622] px-6 py-5">
      {/* ── Row 1: Early Comp | Traits | Carousel ── */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* Early Comp */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Early Comp</p>
          <div className="flex gap-2 flex-wrap">
            {earlyComp.map((champ) => (
              <MiniChamp key={champ.name} {...champ} />
            ))}
          </div>
        </div>

        {/* Traits */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Traits</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {traits.map((trait) => (
              <TraitHex key={trait.name} {...trait} />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Carousel</p>
          <div className="flex items-center gap-2">
            {carousel.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-slate-500" />}
                <ItemIcon {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Options | Positioning ── */}
      <div className="grid grid-cols-[auto_1fr] gap-8 items-start">

        {/* Options */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Options</p>
          <div className="space-y-3">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                {opt.level && (
                  <span className="text-[11px] font-bold text-slate-300 bg-slate-700 rounded px-2 py-1 shrink-0">
                    {opt.level}
                  </span>
                )}
                <MiniChamp {...opt.swapOut} size="w-9 h-9" />
                <ChevronRight size={13} className="text-slate-500 shrink-0" />
                <div className="flex gap-1.5">
                  {opt.swapIn.map((champ) => (
                    <MiniChamp key={champ.name} {...champ} size="w-9 h-9" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Positioning */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Positioning</p>
          <HexBoard positions={positioning} />
        </div>

      </div>
    </div>
  );
};

export default CompDetail;
