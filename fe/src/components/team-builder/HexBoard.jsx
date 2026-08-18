import { Plus, X } from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────
const ROWS = 4;
const COLS = 7;
const HEX_SIZE = 56; // px — diameter of the hex
const HEX_GAP = 6;   // px gap between hexes

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

const CDN_ICON = (id) =>
  `https://res.cloudinary.com/ecoturre/image/upload/w_56,h_56,c_fill,g_auto,q_auto,f_auto/${id}`;

// ─── Single Hex Cell ──────────────────────────────────────────────────────────
const HexCell = ({ index, champion, isHighlighted, isHolding, onClick, onRemove, imageMap }) => {
  const isEmpty = !champion;
  const initials = champion
    ? champion.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "";
  const imgId = champion ? imageMap?.[champion.name] : null;

  return (
    <div
      className="relative group"
      style={{ width: HEX_SIZE, height: HEX_SIZE }}
    >
      {/* Hex shape */}
      <button
        type="button"
        onClick={onClick}
        className={`
          w-full h-full flex flex-col items-center justify-center
          transition-all duration-150 cursor-pointer select-none
          ${isEmpty
            ? isHighlighted && isHolding
              ? "bg-orange-500/20 border-2 border-orange-400/70 hover:bg-orange-500/30"
              : "bg-slate-800/40 border-2 border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600"
            : `border-2 ${COST_BORDER[champion.cost]} ${COST_BG[champion.cost]} hover:brightness-125`
          }
        `}
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        {isEmpty ? (
          isHolding ? (
            <Plus size={14} className="text-orange-400/60" />
          ) : (
            <span className="text-slate-700 text-[10px] font-bold">{index + 1}</span>
          )
        ) : (
          <div className="flex flex-col items-center gap-0.5 w-full h-full justify-center">
            {/* Cost dots */}
            <div className="flex gap-0.5">
              {Array.from({ length: champion.cost }).map((_, i) => (
                <span key={i} className={`w-1 h-1 rounded-full ${COST_DOT[champion.cost]}`} />
              ))}
            </div>
            {/* Avatar */}
            <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center">
              {imgId ? (
                <>
                  <img
                    src={CDN_ICON(imgId)}
                    alt={champion.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <span className="w-full h-full items-center justify-center text-[10px] font-black text-slate-100 hidden">
                    {initials}
                  </span>
                </>
              ) : (
                <span className="text-[10px] font-black text-slate-100">{initials}</span>
              )}
            </div>
          </div>
        )}
      </button>

      {/* Champion name tooltip below */}
      {!isEmpty && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 pointer-events-none">
          <span className="text-[9px] text-slate-400 font-medium">{champion.name}</span>
        </div>
      )}

      {/* Remove button on hover */}
      {!isEmpty && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 hover:bg-red-500 rounded-full items-center justify-center hidden group-hover:flex z-20 transition-colors"
        >
          <X size={9} className="text-white" />
        </button>
      )}
    </div>
  );
};

// ─── Hex Board ────────────────────────────────────────────────────────────────
const HexBoard = ({ board, selectedChamp, onCellClick, onRemove, imageMap }) => {
  // Board is a flat array of ROWS*COLS slots (null or champion)
  const step = HEX_SIZE + HEX_GAP;
  const offset = step / 2; // row offset for odd rows
  const boardW = COLS * step + offset;
  const boardH = ROWS * step * 0.866 + HEX_SIZE * 0.134;

  return (
    <div className="bg-[#0f1b27] border border-slate-800 rounded-xl p-6">
      {/* Board label */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-sm">Board</h3>
          <p className="text-slate-500 text-xs">
            {board.filter(Boolean).length}/9 slots · Hàng 1 = phía sau · Hàng 4 = phía trước
          </p>
        </div>
        <div className="text-[10px] text-slate-600 text-right">
          <span className="block">← Phía sau (backline)</span>
          <span className="block">→ Phía trước (frontline)</span>
        </div>
      </div>

      {/* Hex grid */}
      <div
        className="relative mx-auto"
        style={{ width: boardW, height: boardH + 20 }}
      >
        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLS }).map((_, col) => {
            const index = row * COLS + col;
            const champ = board[index] || null;
            // Odd rows (1, 3) shift right
            const x = col * step + (row % 2 === 1 ? offset : 0);
            const y = row * step * 0.866;

            return (
              <div
                key={index}
                className="absolute"
                style={{ left: x, top: y }}
              >
                <HexCell
                  index={index}
                  champion={champ}
                  isHolding={!!selectedChamp}
                  isHighlighted={!champ}
                  onClick={() => onCellClick(index)}
                  onRemove={() => onRemove(index)}
                  imageMap={imageMap}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HexBoard;
