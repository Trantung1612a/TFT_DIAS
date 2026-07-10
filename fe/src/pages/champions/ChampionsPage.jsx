import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import { champions, COSTS } from "../../data/champions";

// ── Cost styling ─────────────────────────────────────────────────────────────
const COST_BORDER = {
  1: "border-slate-400",
  2: "border-green-500",
  3: "border-blue-500",
  4: "border-fuchsia-500",
  5: "border-amber-400",
};
const COST_BG = {
  1: "bg-slate-800",
  2: "bg-green-950",
  3: "bg-blue-950",
  4: "bg-fuchsia-950",
  5: "bg-amber-950",
};
const COST_DOT = {
  1: "bg-slate-400",
  2: "bg-green-500",
  3: "bg-blue-500",
  4: "bg-fuchsia-500",
  5: "bg-amber-400",
};
const COST_LABEL = {
  1: "text-slate-400",
  2: "text-green-500",
  3: "text-blue-400",
  4: "text-fuchsia-400",
  5: "text-amber-400",
};

// ── Champion card ─────────────────────────────────────────────────────────────
const ChampionCard = ({ name, cost }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
      <div
        className={`w-16 h-16 rounded-md border-2 ${COST_BORDER[cost]} ${COST_BG[cost]}
          flex flex-col items-center justify-center gap-1
          group-hover:brightness-125 transition-all`}
      >
        {/* Cost dots */}
        <div className="flex gap-0.5">
          {Array.from({ length: cost }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${COST_DOT[cost]}`} />
          ))}
        </div>
        {/* Initials */}
        <span className="text-sm font-bold text-slate-100">{initials}</span>
      </div>
      <span className="text-[11px] text-slate-400 group-hover:text-slate-200 text-center truncate w-16 transition-colors">
        {name}
      </span>
    </div>
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

  const toggleCost = (cost) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(cost) ? next.delete(cost) : next.add(cost);
      return next;
    });

  const filtered = useMemo(() => {
    return champions.filter((c) => {
      const matchCost   = activeCosts.size === 0 || activeCosts.has(c.cost);
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchCost && matchSearch;
    });
  }, [search, activeCosts]);

  // Group by cost for section headers
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      if (!map[c.cost]) map[c.cost] = [];
      map[c.cost].push(c);
    });
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
            <CostBtn
              key={cost}
              cost={cost}
              active={activeCosts.has(cost)}
              onClick={() => toggleCost(cost)}
            />
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
          // Default: grouped by cost with section headers
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
                      <ChampionCard key={champ.name} {...champ} />
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        ) : (
          // Filtered: flat grid, 8 per row
          filtered.length > 0 ? (
            <div className="grid grid-cols-8 gap-x-4 gap-y-5">
              {filtered.map((champ) => (
                <ChampionCard key={champ.name} {...champ} />
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-20 text-sm">
              No champions found for "{search}"
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default ChampionsPage;
