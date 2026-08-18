import { useState, useEffect } from "react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import { originService } from "../../service/origin.service";
import { classService } from "../../service/class.service";

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

const TRAIT_COLORS = [
  { color: "from-purple-900 to-slate-900", border: "border-purple-700", dot: "bg-purple-500" },
  { color: "from-pink-900 to-slate-900", border: "border-pink-600", dot: "bg-pink-500" },
  { color: "from-amber-900 to-slate-900", border: "border-amber-600", dot: "bg-amber-500" },
  { color: "from-green-900 to-slate-900", border: "border-green-600", dot: "bg-green-500" },
  { color: "from-cyan-900 to-slate-900", border: "border-cyan-600", dot: "bg-cyan-500" },
  { color: "from-blue-900 to-slate-900", border: "border-blue-600", dot: "bg-blue-500" },
  { color: "from-red-900 to-slate-900", border: "border-red-600", dot: "bg-red-500" },
  { color: "from-violet-900 to-slate-900", border: "border-violet-600", dot: "bg-violet-500" },
  { color: "from-orange-900 to-slate-900", border: "border-orange-600", dot: "bg-orange-500" },
  { color: "from-teal-900 to-slate-900", border: "border-teal-600", dot: "bg-teal-500" },
];

const TraitCard = ({ item, index }) => {
  const points = item.breakpoints || item.tiers || [];
  const label = item.breakpoints ? "Breakpoints" : "Tiers";
  const abbr = item.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const style = TRAIT_COLORS[index % TRAIT_COLORS.length];

  return (
    <div className={`rounded-xl border ${style.border} bg-gradient-to-br ${style.color} p-5 flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded border ${style.border} flex items-center justify-center text-[11px] font-bold text-slate-100 shrink-0`}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          {abbr}
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">{item.name}</p>
          {item.set && (
            <span className="text-[10px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">Set {item.set}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>

      {/* Breakpoints / Tiers */}
      {points.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
          <ul className="space-y-1.5">
            {points.map((bp) => (
              <BreakpointRow key={bp.number || bp._id} {...bp} dot={style.dot} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ── Tab button ──────────────────────────────────────────────────────────────
const Tab = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${active
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
  const [origins, setOrigins] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      originService.getAll({ limit: 200 }),
      classService.getAll({ limit: 200 }),
    ])
      .then(([origRes, classRes]) => {
        setOrigins(origRes.data?.origins || origRes.data || []);
        setClasses(classRes.data?.classes || classRes.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const items = tab === "origins" ? origins : classes;
  const isOrig = tab === "origins";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0b141d]">
        <TFTHeader />
        <div className="flex-1 flex items-center justify-center">
          <span className="w-8 h-8 border-4 border-slate-600 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b141d]">
      <TFTHeader />

      <main className="flex-1 px-8 py-6 max-w-screen-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-1">Database</h1>
        <p className="text-slate-400 text-sm mb-6">Origins &amp; Classes reference</p>

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
          {items.map((item, index) => (
            <TraitCard key={item._id || item.name} item={item} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DatabasePage;
