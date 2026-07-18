import { useState, useEffect, useMemo } from "react";
import { Search, X, Zap, Shield } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import RichText from "../../components/RichText";
import { champions, COSTS } from "../../data/champions";

const API        = "http://localhost:5000/api/champions";
// Square icon for team comp / champion card grid
const CDN_ICON   = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_80,h_80,c_fill,g_auto,q_auto,f_auto/${id}`;
// Full landscape banner for detail popup
const CDN_BANNER = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_512,h_256,c_fill,q_auto:best,f_auto,e_sharpen:60/${id}`;

const COST_BORDER = { 1:"border-slate-400", 2:"border-green-500", 3:"border-blue-500", 4:"border-fuchsia-500", 5:"border-amber-400" };
const COST_BG     = { 1:"bg-slate-800",     2:"bg-green-950",     3:"bg-blue-950",     4:"bg-fuchsia-950",     5:"bg-amber-950"    };
const COST_DOT    = { 1:"bg-slate-400",     2:"bg-green-500",     3:"bg-blue-500",     4:"bg-fuchsia-500",     5:"bg-amber-400"    };
const COST_LABEL  = { 1:"text-slate-400",   2:"text-green-500",   3:"text-blue-400",   4:"text-fuchsia-400",  5:"text-amber-400"   };
const COST_GLOW   = { 1:"shadow-slate-400/20", 2:"shadow-green-500/20", 3:"shadow-blue-500/20", 4:"shadow-fuchsia-500/20", 5:"shadow-amber-400/30" };

const ChampionDetailModal = ({ champion: local, onClose }) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}?search=${encodeURIComponent(local.name)}&limit=1`)
      .then((r) => r.json())
      .then((json) => {
        const found = json.data?.champions?.[0];
        setData(found || null);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [local.name]);

  const cost    = local.cost;
  const name    = data?.name    || local.name;
  const origins = data?.origins || (local.origin ? [{ name: local.origin }] : []);
  const classes = data?.classes || (local.cls    ? [{ name: local.cls    }] : []);
  const ability = data?.ability;
  const imgId   = data?.base_image_id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-[#0f1b27] border-2 ${COST_BORDER[cost]} rounded-2xl w-full max-w-md shadow-2xl ${COST_GLOW[cost]} overflow-hidden`}>

        {/* ── Hero banner: blurred backdrop + sharp portrait ── */}
        <div className="relative h-52 overflow-hidden">
          {imgId ? (
            <>
              {/* Full-width landscape banner */}
              <img
                src={CDN_BANNER(imgId)}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </>
          ) : (
            <div className={`absolute inset-0 ${COST_BG[cost]} flex items-center justify-center`}>
              <span className="text-7xl font-black text-slate-600 select-none">
                {name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Gradient bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b27] via-transparent to-black/10" />

          {/* Close button */}
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 text-slate-300 hover:text-white transition-colors">
            <X size={16} />
          </button>

          {/* Name + cost overlaid */}
          <div className="absolute bottom-3 left-4 right-14">
            <h2 className="text-2xl font-black text-white drop-shadow-lg leading-tight">{name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-0.5">
                {Array.from({ length: cost }).map((_, i) => (
                  <span key={i} className={`w-2.5 h-2.5 rounded-full ${COST_DOT[cost]}`} />
                ))}
              </div>
              <span className={`text-xs font-bold ${COST_LABEL[cost]}`}>{cost}-Cost</span>
            </div>
          </div>
        </div>

        {/* ── Trait badges ── */}
        <div className="px-4 pt-3 pb-1 flex flex-wrap gap-1.5">
          {origins.map((o, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-900/60 text-blue-300 font-medium border border-blue-700/50">
              {o.name}
            </span>
          ))}
          {classes.map((c, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-300 font-medium border border-purple-700/50">
              {c.name}
            </span>
          ))}
        </div>

        {/* ── Ability section ── */}
        <div className="px-4 py-3">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
              <span className="w-4 h-4 border-2 border-slate-600 border-t-orange-500 rounded-full animate-spin" />
              Đang tải thông tin...
            </div>
          ) : ability ? (
            <div className="space-y-3">
              {/* Ability header */}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded ${COST_BG[cost]} border ${COST_BORDER[cost]} flex items-center justify-center shrink-0`}>
                  {ability.type === "active"
                    ? <Zap   size={14} className={COST_LABEL[cost]} />
                    : <Shield size={14} className={COST_LABEL[cost]} />}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{ability.name || "Ability"}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${ability.type === "active" ? "text-orange-400" : "text-slate-400"}`}>
                    {ability.type}
                  </span>
                </div>
              </div>

              {/* Description with RichText */}
              <div className="bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700/50">
                <RichText
                  text={ability.description}
                  className="text-sm text-slate-300 leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-500 text-sm">Chưa có dữ liệu ability trong database.</p>
              <p className="text-slate-600 text-xs mt-1">Thêm qua trang <span className="text-orange-400/70">/admin/champions</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Champion card ─────────────────────────────────────────────────────────────
const ChampionCard = ({ name, cost, onClick }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group cursor-pointer bg-transparent border-0 p-0"
    >
      <div
        className={`w-16 h-16 rounded-md border-2 ${COST_BORDER[cost]} ${COST_BG[cost]}
          flex flex-col items-center justify-center gap-1
          group-hover:brightness-125 group-hover:scale-105 transition-all duration-150`}
      >
        <div className="flex gap-0.5">
          {Array.from({ length: cost }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${COST_DOT[cost]}`} />
          ))}
        </div>
        <span className="text-sm font-bold text-slate-100">{initials}</span>
      </div>
      <span className="text-[11px] text-slate-400 group-hover:text-slate-200 text-center truncate w-16 transition-colors">
        {name}
      </span>
    </button>
  );
};

// ── Cost filter button ────────────────────────────────────────────────────────
const CostBtn = ({ cost, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
      active
        ? `${COST_BG[cost]} ${COST_BORDER[cost]} ${COST_LABEL[cost]}`
        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
    }`}
  >
    <div className="flex gap-0.5">
      {Array.from({ length: cost }).map((_, i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${active ? COST_DOT[cost] : "bg-slate-600"}`} />
      ))}
    </div>
    {cost}-Cost
  </button>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const ChampionsPage = () => {
  const [search, setSearch]       = useState("");
  const [activeCosts, setActive]  = useState(new Set());
  const [selected, setSelected]   = useState(null);

  const toggleCost = (cost) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(cost) ? next.delete(cost) : next.add(cost);
      return next;
    });

  const filtered = useMemo(() =>
    champions.filter((c) => {
      const matchCost   = activeCosts.size === 0 || activeCosts.has(c.cost);
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchCost && matchSearch;
    }),
    [search, activeCosts]
  );

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => { if (!map[c.cost]) map[c.cost] = []; map[c.cost].push(c); });
    return map;
  }, [filtered]);

  const showGrouped = activeCosts.size === 0 && search === "";

  return (
    <div className="min-h-screen flex flex-col bg-[#0b141d]">
      <TFTHeader activePage="Champions" />

      <main className="flex-1 px-8 py-6 max-w-screen-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-1">Champions</h1>
        <p className="text-slate-400 text-sm mb-6">Set 17 · {champions.length} champions</p>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {COSTS.map((cost) => (
            <CostBtn key={cost} cost={cost} active={activeCosts.has(cost)} onClick={() => toggleCost(cost)} />
          ))}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 ml-auto w-64">
            <Search size={14} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Search champion..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none w-full"
            />
          </div>
        </div>

        {/* Champion grid */}
        {showGrouped ? (
          <div className="space-y-8">
            {COSTS.map((cost) =>
              grouped[cost]?.length ? (
                <section key={cost}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: cost }).map((_, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${COST_DOT[cost]}`} />
                      ))}
                    </div>
                    <span className={`text-sm font-bold ${COST_LABEL[cost]}`}>{cost}-Cost</span>
                    <span className="text-slate-600 text-xs ml-1">({grouped[cost].length})</span>
                  </div>
                  <div className="grid grid-cols-8 gap-x-4 gap-y-5">
                    {grouped[cost].map((champ) => (
                      <ChampionCard key={champ.name} {...champ} onClick={() => setSelected(champ)} />
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-8 gap-x-4 gap-y-5">
            {filtered.map((champ) => (
              <ChampionCard key={champ.name} {...champ} onClick={() => setSelected(champ)} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-20 text-sm">
            No champions found for "{search}"
          </div>
        )}
      </main>

      {selected && (
        <ChampionDetailModal champion={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default ChampionsPage;
