import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { champions, COSTS } from "../../data/champions";

const CDN_ICON = (id) =>
  `https://res.cloudinary.com/ecoturre/image/upload/w_48,h_48,c_fill,g_auto,q_auto,f_auto/${id}`;

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
  2: "text-green-400",
  3: "text-blue-400",
  4: "text-fuchsia-400",
  5: "text-amber-400",
};

const ChampionChip = ({ champion, isSelected, isOnBoard, onClick, imageMap }) => {
  const { name, cost } = champion;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const imgId = imageMap?.[name];

  return (
    <button
      type="button"
      onClick={() => onClick(champion)}
      title={`${name} (${cost}-cost) — ${champion.origin} · ${champion.cls}`}
      className={`
        relative flex flex-col items-center gap-1 p-1 rounded-lg cursor-pointer
        transition-all duration-150 group border-2 select-none
        ${isSelected
          ? `${COST_BORDER[cost]} ring-2 ring-white/40 brightness-110 scale-105`
          : isOnBoard
          ? `${COST_BORDER[cost]} opacity-40 saturate-50`
          : `${COST_BORDER[cost]} hover:brightness-125 hover:scale-105`
        }
        ${COST_BG[cost]}
      `}
      style={{ minWidth: 52 }}
    >
      {/* Cost dots */}
      <div className="flex gap-0.5 pt-0.5">
        {Array.from({ length: cost }).map((_, i) => (
          <span key={i} className={`w-1 h-1 rounded-full ${COST_DOT[cost]}`} />
        ))}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded overflow-hidden flex items-center justify-center shrink-0">
        {imgId ? (
          <img
            src={CDN_ICON(imgId)}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        <span
          className={`w-full h-full items-center justify-center text-[11px] font-black text-slate-100 ${imgId ? "hidden" : "flex"}`}
        >
          {initials}
        </span>
      </div>

      {/* Name */}
      <span className="text-[9px] text-slate-300 truncate w-full text-center leading-tight px-0.5">
        {name}
      </span>

      {/* Selected overlay pulse */}
      {isSelected && (
        <span className="absolute inset-0 rounded-lg ring-2 ring-white animate-pulse pointer-events-none" />
      )}
    </button>
  );
};

const ChampionPool = ({ selectedChamp, onSelectChamp, boardChamps, imageMap }) => {
  const [search, setSearch] = useState("");

  const boardNames = useMemo(() => new Set(boardChamps.map((c) => c?.name).filter(Boolean)), [boardChamps]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return champions.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.origin.toLowerCase().includes(q) ||
      c.cls.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      if (!map[c.cost]) map[c.cost] = [];
      map[c.cost].push(c);
    });
    return map;
  }, [filtered]);

  return (
    <div className="bg-[#0f1b27] border border-slate-800 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-sm">Champion Pool</h3>
          <p className="text-slate-500 text-xs">
            {selectedChamp ? (
              <span className="text-orange-400 font-medium">
                Đang cầm: {selectedChamp.name} — click ô hex để đặt · Esc để hủy
              </span>
            ) : (
              "Click champion để chọn, rồi click ô hex để đặt lên board"
            )}
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 w-52">
          <Search size={13} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Tìm champion, trait..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-slate-200 placeholder:text-slate-500 outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={12} className="text-slate-500 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Champion rows by cost */}
      <div className="space-y-3">
        {COSTS.map((cost) => {
          const champs = grouped[cost];
          if (!champs?.length) return null;
          return (
            <div key={cost}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: cost }).map((_, i) => (
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${COST_DOT[cost]}`} />
                  ))}
                </div>
                <span className={`text-[10px] font-bold ${COST_LABEL[cost]}`}>{cost}-Cost</span>
                <span className="text-slate-600 text-[10px]">({champs.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {champs.map((champ) => (
                  <ChampionChip
                    key={champ.name}
                    champion={champ}
                    isSelected={selectedChamp?.name === champ.name}
                    isOnBoard={boardNames.has(champ.name)}
                    onClick={onSelectChamp}
                    imageMap={imageMap}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-6">
            Không tìm thấy champion nào cho &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
};

export default ChampionPool;
