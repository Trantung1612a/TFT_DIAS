import { useState, useEffect, useCallback, useMemo } from "react";
import { Trash2, Share2, Check } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import HexBoard from "../../components/team-builder/HexBoard";
import SynergyPanel from "../../components/team-builder/SynergyPanel";
import ChampionPool from "../../components/team-builder/ChampionPool";

const TOTAL_CELLS = 4 * 7; // 28 hex slots
const MAX_CHAMPS = 9;

const API = `${import.meta.env.VITE_API_URL || "/api"}/champions`;

// ─── Hook: load image IDs from DB ─────────────────────────────────────────────
function useChampionImages() {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    fetch(`${API}?limit=200`)
      .then((r) => r.json())
      .then((json) => {
        const champs = json.data?.champions || [];
        const map = {};
        champs.forEach((c) => {
          if (c.name && c.base_image_id) map[c.name] = c.base_image_id;
        });
        setImageMap(map);
      })
      .catch(() => {}); // graceful fail — initials fallback
  }, []);

  return imageMap;
}

// ─── Helper: encode/decode board as URL param ─────────────────────────────────
function encodeBoard(board) {
  const slots = board.map((c) => (c ? encodeURIComponent(c.name) : "_"));
  return slots.join(",");
}

// ─── Team Builder Page ────────────────────────────────────────────────────────
const TeamBuilderPage = () => {
  // 28-slot flat array (null = empty)
  const [board, setBoard] = useState(Array(TOTAL_CELLS).fill(null));
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [copied, setCopied] = useState(false);
  const imageMap = useChampionImages();

  // Count champions on board
  const champCount = useMemo(() => board.filter(Boolean).length, [board]);

  // ── Keyboard: Esc cancels selection ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSelectedChamp(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Click a champion in pool ──────────────────────────────────────────────────
  const handleSelectChamp = useCallback(
    (champ) => {
      // If clicking the already-selected champ → deselect
      if (selectedChamp?.name === champ.name) {
        setSelectedChamp(null);
        return;
      }
      // If champ is already on board → remove it from board and deselect
      const existingIdx = board.findIndex((c) => c?.name === champ.name);
      if (existingIdx !== -1) {
        setBoard((prev) => {
          const next = [...prev];
          next[existingIdx] = null;
          return next;
        });
        setSelectedChamp(null);
        return;
      }
      setSelectedChamp(champ);
    },
    [selectedChamp, board]
  );

  // ── Click a hex cell ──────────────────────────────────────────────────────────
  const handleCellClick = useCallback(
    (index) => {
      const current = board[index];

      if (selectedChamp) {
        // Already at max and trying to fill empty cell
        if (!current && champCount >= MAX_CHAMPS) return;

        // If the slot already has the same champ → deselect
        if (current?.name === selectedChamp.name) {
          setSelectedChamp(null);
          return;
        }

        // Place selected champ. If it was elsewhere, move it.
        setBoard((prev) => {
          const next = [...prev];
          // Remove from old position if it was on board
          const oldIdx = next.findIndex((c) => c?.name === selectedChamp.name);
          if (oldIdx !== -1) next[oldIdx] = null;
          next[index] = selectedChamp;
          return next;
        });
        setSelectedChamp(null);
      } else {
        // No champ held: clicking an occupied cell picks it up
        if (current) {
          setSelectedChamp(current);
          setBoard((prev) => {
            const next = [...prev];
            next[index] = null;
            return next;
          });
        }
      }
    },
    [selectedChamp, board, champCount]
  );

  // ── Remove champion from cell ─────────────────────────────────────────────────
  const handleRemove = useCallback((index) => {
    setBoard((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  // ── Clear entire board ────────────────────────────────────────────────────────
  const handleClear = () => {
    setBoard(Array(TOTAL_CELLS).fill(null));
    setSelectedChamp(null);
  };

  // ── Copy share link ───────────────────────────────────────────────────────────
  const handleShare = () => {
    const encoded = encodeBoard(board);
    const url = `${window.location.origin}/team-builder?board=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#0b141d]"
      // Click outside board/pool to cancel hold
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedChamp(null);
      }}
    >
      <TFTHeader activePage="Team Builder" />

      <main className="flex-1 flex flex-col px-6 py-5 max-w-screen-2xl mx-auto w-full gap-5">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Team Builder</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Set 17 · Đặt champions lên board để xem trait synergies
              {selectedChamp && (
                <span className="ml-3 text-orange-400 font-semibold animate-pulse">
                  ✦ Đang cầm: {selectedChamp.name} — click ô hex để đặt · Esc để hủy
                </span>
              )}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-green-400" />
                  <span className="text-green-400">Đã copy!</span>
                </>
              ) : (
                <>
                  <Share2 size={15} />
                  Chia sẻ
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={champCount === 0 && !selectedChamp}
              className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/70 border border-red-800 text-red-300 text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Trash2 size={15} />
              Xóa board
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex gap-5 items-start">
          {/* Left: Board */}
          <div className="flex-1 min-w-0">
            <HexBoard
              board={board}
              selectedChamp={selectedChamp}
              onCellClick={handleCellClick}
              onRemove={handleRemove}
              imageMap={imageMap}
            />
          </div>

          {/* Right: Synergy Panel */}
          <SynergyPanel boardChamps={board} />
        </div>

        {/* ── Champion Pool (bottom) ── */}
        <ChampionPool
          selectedChamp={selectedChamp}
          onSelectChamp={handleSelectChamp}
          boardChamps={board}
          imageMap={imageMap}
        />

        {/* ── Tip bar ── */}
        <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-lg px-5 py-3 text-xs text-slate-500">
          <span className="text-slate-400 font-semibold">Hướng dẫn:</span>
          <span>① Click champion trong pool để cầm</span>
          <span>② Click ô hex để đặt xuống</span>
          <span>③ Click champion đang cầm hoặc champion trên board để bỏ</span>
          <span>④ Hover ô hex → <kbd className="bg-slate-800 border border-slate-700 rounded px-1">✕</kbd> để xóa</span>
          <span className="ml-auto"><kbd className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5">Esc</kbd> — hủy đang cầm</span>
        </div>
      </main>
    </div>
  );
};

export default TeamBuilderPage;
