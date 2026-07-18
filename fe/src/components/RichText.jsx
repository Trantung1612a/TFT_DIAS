/**
 * RichText — renders TFT ability description with inline icons & colored values.
 *
 * Token syntax in the description string:
 *   {115/210/2500}   → [ 115 / 210 / 2500 ] in gold (star-level scaling values)
 *   {ad}             → physical damage icon
 *   {ap} or {sp}     → magic / spell damage icon
 *   {mana}           → mana icon
 *   {health} {hp}    → health icon
 *   {armor}          → armor icon
 *   {mr}             → magic resist icon
 *   {as}             → attack speed icon
 *   {crit}           → crit chance icon
 *   {sundering}      → status effect keyword (orange bold text)
 *   {stunned}        → keyword
 *   ... any unknown {word} → treated as keyword / highlighted text
 */

const CDN_ICON = (name) =>
  `https://raw.communitydragon.org/latest/game/assets/ux/fonts/body_icon_${name}.png`;

// Map token → { src, alt, fallbackColor }
const STAT_ICON_MAP = {
  ad:           { src: CDN_ICON("ad"),           alt: "AD",   color: "#e87d12" },
  ap:           { src: CDN_ICON("ap"),           alt: "AP",   color: "#a855f7" },
  sp:           { src: CDN_ICON("ap"),           alt: "AP",   color: "#a855f7" },
  mana:         { src: CDN_ICON("mana"),         alt: "Mana", color: "#3b82f6" },
  health:       { src: CDN_ICON("hp"),           alt: "HP",   color: "#ef4444" },
  hp:           { src: CDN_ICON("hp"),           alt: "HP",   color: "#ef4444" },
  armor:        { src: CDN_ICON("armor"),        alt: "AR",   color: "#eab308" },
  mr:           { src: CDN_ICON("mr"),           alt: "MR",   color: "#22d3ee" },
  magicresist:  { src: CDN_ICON("mr"),           alt: "MR",   color: "#22d3ee" },
  as:           { src: CDN_ICON("attackspeed"),  alt: "AS",   color: "#84cc16" },
  attackspeed:  { src: CDN_ICON("attackspeed"),  alt: "AS",   color: "#84cc16" },
  crit:         { src: CDN_ICON("crit"),         alt: "Crit", color: "#f59e0b" },
};

// ── Fallback circle icon when CDN image fails ───────────────────────────────
const FallbackIcon = ({ alt, color }) => (
  <span
    className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-extrabold leading-none align-middle mx-[1px]"
    style={{ background: color, color: "#fff" }}
  >
    {alt.slice(0, 2)}
  </span>
);

// ── Stat icon with CDN image + fallback ────────────────────────────────────
const StatIcon = ({ token }) => {
  const meta = STAT_ICON_MAP[token.toLowerCase()];
  if (!meta) return null;

  return (
    <span className="inline-flex items-center justify-center w-4 h-4 align-middle mx-[1px]">
      <img
        src={meta.src}
        alt={meta.alt}
        className="w-4 h-4 object-contain"
        onError={(e) => {
          // Replace broken img with fallback circle
          const span = document.createElement("span");
          span.style.cssText = `display:inline-flex;align-items:center;justify-content:center;width:1rem;height:1rem;border-radius:50%;background:${meta.color};color:#fff;font-size:9px;font-weight:800;line-height:1;`;
          span.textContent = meta.alt.slice(0, 2);
          e.target.replaceWith(span);
        }}
      />
    </span>
  );
};

// ── Value token: {115/210/2500} ─────────────────────────────────────────────
const ValueToken = ({ raw }) => {
  const parts = raw.split("/").map((p) => p.trim());
  return (
    <span className="text-yellow-400 font-semibold">
      {"[ "}
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="text-yellow-600"> / </span>}
          {p}
        </span>
      ))}
      {" ]"}
    </span>
  );
};

// ── Keyword / status effect ─────────────────────────────────────────────────
const Keyword = ({ word }) => (
  <span className="text-orange-400 font-semibold capitalize">{word}</span>
);

// ── Tokenizer ───────────────────────────────────────────────────────────────
const TOKEN_RE = /\{([^}]+)\}/g;

const parseTokens = (text) => {
  const parts = [];
  let last = 0;
  let match;

  while ((match = TOKEN_RE.exec(text)) !== null) {
    // Plain text before this token
    if (match.index > last) {
      parts.push({ type: "text", value: text.slice(last, match.index) });
    }

    const inner = match[1].trim();

    if (/[\d.]+\/[\d.]+/.test(inner)) {
      parts.push({ type: "value", value: inner });
    } else if (STAT_ICON_MAP[inner.toLowerCase()]) {
      parts.push({ type: "icon", value: inner });
    } else {
      parts.push({ type: "keyword", value: inner });
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }

  return parts;
};

// ── Main component ──────────────────────────────────────────────────────────
const RichText = ({ text, className = "" }) => {
  if (!text) return null;

  const tokens = parseTokens(text);

  return (
    <span className={className}>
      {tokens.map((tok, i) => {
        if (tok.type === "text")    return <span key={i}>{tok.value}</span>;
        if (tok.type === "value")   return <ValueToken key={i} raw={tok.value} />;
        if (tok.type === "icon")    return <StatIcon   key={i} token={tok.value} />;
        if (tok.type === "keyword") return <Keyword    key={i} word={tok.value} />;
        return null;
      })}
    </span>
  );
};

export default RichText;
