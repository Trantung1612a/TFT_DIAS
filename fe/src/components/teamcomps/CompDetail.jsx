import { ChevronRight } from "lucide-react";

// ─── Cost border/bg colours ──────────────────────────────────────────────────
const COST_BORDER = {
  1: "#6B7280",
  2: "#22C55E",
  3: "#3B82F6",
  4: "#D946EF",
  5: "#C89B3C",
};
const COST_BG = {
  1: "#0F1015",
  2: "#052012",
  3: "#050F25",
  4: "#1A0520",
  5: "#150D00",
};

// ─── Trait tier colours ──────────────────────────────────────────────────────
const TRAIT_TIER = {
  bronze:    { bg: "rgba(139,90,43,0.25)",   border: "rgba(139,90,43,0.5)",   text: "#C8874A" },
  silver:    { bg: "rgba(148,163,184,0.15)", border: "rgba(148,163,184,0.4)", text: "#CBD5E1" },
  gold:      { bg: "rgba(200,155,60,0.2)",   border: "rgba(200,155,60,0.5)",  text: "#E8B84B" },
  prismatic: { bg: "rgba(192,132,252,0.2)",  border: "rgba(192,132,252,0.5)", text: "#D8B4FE" },
};

// ─── Small champion avatar ───────────────────────────────────────────────────
const MiniChamp = ({ name, cost, size = "w-11 h-11" }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const border = COST_BORDER[cost] || "#6B7280";
  const bg = COST_BG[cost] || "#0F1015";
  return (
    <div
      className={`${size} rounded flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-200`}
      style={{
        border: `2px solid ${border}`,
        background: bg,
        color: "#F0E6D2",
        fontFamily: "'Inter', sans-serif",
        boxShadow: `0 0 6px ${border}40`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 14px ${border}80`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 6px ${border}40`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {initials}
    </div>
  );
};

// ─── Hexagonal trait badge ───────────────────────────────────────────────────
const TraitHex = ({ name, count, tier }) => {
  const { bg, border, text } = TRAIT_TIER[tier] || TRAIT_TIER.bronze;
  const abbr = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-9 h-9 flex items-center justify-center text-[9px] font-bold shrink-0"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          color: text,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {abbr}
      </div>
      <span
        className="text-[11px] font-bold rounded px-1 min-w-[18px] text-center"
        style={{ color: text, background: "rgba(0,0,0,0.4)", fontFamily: "'Inter', sans-serif" }}
      >
        {count}
      </span>
      <span
        className="text-[11px] truncate max-w-[72px]"
        style={{ color: "#A89880", fontFamily: "'Inter', sans-serif" }}
      >
        {name}
      </span>
    </div>
  );
};

// ─── Item icon ───────────────────────────────────────────────────────────────
const ItemIcon = ({ name, color }) => {
  const abbr = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      title={name}
      className="w-9 h-9 rounded flex items-center justify-center text-[9px] font-bold shrink-0 transition-all duration-200"
      style={{
        background: color || "rgba(200,155,60,0.08)",
        border: "1px solid rgba(200,155,60,0.25)",
        color: "#F0E6D2",
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(200,155,60,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {abbr}
    </div>
  );
};

// ─── TFT Hex positioning board ───────────────────────────────────────────────
const BOARD_ROWS = 4;
const BOARD_COLS = 7;
const HEX_W = 40;
const HEX_H = 36;
const HEX_OFFSET = HEX_W / 2;

const HexBoard = ({ positions }) => {
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
          const x = col * HEX_W + (row % 2 === 1 ? HEX_OFFSET : 0);
          const y = row * HEX_H;
          const border = champ ? (COST_BORDER[champ.cost] || "#6B7280") : null;
          const bg = champ ? (COST_BG[champ.cost] || "#0F1015") : null;

          return (
            <div
              key={key}
              className="absolute"
              style={{ left: x, top: y, width: HEX_W - 4, height: HEX_W - 4 }}
            >
              {champ ? (
                <div
                  className="w-full h-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    border: `2px solid ${border}`,
                    background: bg,
                    color: "#F0E6D2",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    boxShadow: `0 0 8px ${border}60`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  title={champ.name}
                >
                  {champ.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: "rgba(200,155,60,0.03)",
                    border: "1px solid rgba(200,155,60,0.1)",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
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
    <div
      className="px-6 py-5"
      style={{
        background: "#0B0C10",
        borderTop: "1px solid rgba(200,155,60,0.2)",
      }}
    >
      {/* ── Row 1: Early Comp | Traits | Carousel ── */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* Early Comp */}
        <div>
          <p className="section-label mb-3">Early Comp</p>
          <div className="flex gap-2 flex-wrap">
            {earlyComp.map((champ) => (
              <MiniChamp key={champ.name} {...champ} />
            ))}
          </div>
        </div>

        {/* Traits */}
        <div>
          <p className="section-label mb-3">Traits</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {traits.map((trait) => (
              <TraitHex key={trait.name} {...trait} />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div>
          <p className="section-label mb-3">Carousel</p>
          <div className="flex items-center gap-2">
            {carousel.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} style={{ color: "#5C5040" }} />}
                <ItemIcon {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="divider-gold mb-6" />

      {/* ── Row 2: Options | Positioning ── */}
      <div className="grid grid-cols-[auto_1fr] gap-8 items-start">

        {/* Options */}
        <div>
          <p className="section-label mb-3">Options</p>
          <div className="space-y-3">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                {opt.level && (
                  <span
                    className="text-[11px] font-bold rounded px-2 py-1 shrink-0"
                    style={{
                      background: "rgba(200,155,60,0.1)",
                      border: "1px solid rgba(200,155,60,0.25)",
                      color: "#C89B3C",
                      fontFamily: "'Cinzel', Georgia, serif",
                    }}
                  >
                    {opt.level}
                  </span>
                )}
                <MiniChamp {...opt.swapOut} size="w-9 h-9" />
                <ChevronRight size={13} style={{ color: "#5C5040" }} className="shrink-0" />
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
          <p className="section-label mb-3">Positioning</p>
          <HexBoard positions={positioning} />
        </div>

      </div>
    </div>
  );
};

export default CompDetail;
