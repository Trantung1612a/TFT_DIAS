import { useState, useEffect, useCallback, useMemo } from "react";
import { Trash2, Share2, Check } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import HexBoard from "../../components/team-builder/HexBoard";
import SynergyPanel from "../../components/team-builder/SynergyPanel";
import ChampionPool from "../../components/team-builder/ChampionPool";
import { championService } from "../../service/champion.service";

const TOTAL_CELLS = 4 * 7; // 28 hex slots
const MAX_CHAMPS = 9;

// ─── Hook: load champions from API ────────────────────────────────────────────
function useChampions() {
  const [champions, setChampions] = useState([]);
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    championService.getAll({ limit: 200 })
      .then((res) => {
        const champs = res.data?.champions || [];
        setChampions(champs);
        const map = {};
        champs.forEach((c) => {
          if (c.name && c.base_image_id) map[c.name] = c.base_image_id;
        });
        setImageMap(map);
      })
      .catch(() => {});
  }, []);

  return { champions, imageMap };
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
  const { champions, imageMap } = useChampions();

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
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #0B0C10 0%, #1A1C29 60%, #0B0C10 100%)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedChamp(null);
      }}
    >
      <TFTHeader activePage="Team Builder" />

      <main className="flex-1 flex flex-col px-6 py-5 max-w-screen-2xl mx-auto w-full gap-5">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#8A6B28" }}
            >
              ✦ Mythic Archives
            </span>
            <h1
              className="text-2xl font-bold mt-1"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                color: "#F0E6D2",
                letterSpacing: "0.04em",
                textShadow: "0 0 24px rgba(200,155,60,0.2)",
              }}
            >
              Team Builder
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#A89880", fontFamily: "'Inter', sans-serif" }}>
              Season XVI · Đặt champions lên board để xem trait synergies
              {selectedChamp && (
                <span className="ml-3 font-semibold animate-pulse" style={{ color: "#C89B3C" }}>
                  ✦ Đang cầm: {selectedChamp.name} — click ô hex để đặt · Esc để hủy
                </span>
              )}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                background: "rgba(200,155,60,0.08)",
                border: "1px solid rgba(200,155,60,0.25)",
                color: "#F0E6D2",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(200,155,60,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {copied ? (
                <>
                  <Check size={15} style={{ color: "#0AC8B9" }} />
                  <span style={{ color: "#0AC8B9" }}>Đã copy!</span>
                </>
              ) : (
                <>
                  <Share2 size={15} style={{ color: "#C89B3C" }} />
                  Chia sẻ
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={champCount === 0 && !selectedChamp}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "rgba(140,22,22,0.15)",
                border: "1px solid rgba(140,22,22,0.4)",
                color: "#C55",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "rgba(140,22,22,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(140,22,22,0.15)";
              }}
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
          champions={champions}
          selectedChamp={selectedChamp}
          onSelectChamp={handleSelectChamp}
          boardChamps={board}
          imageMap={imageMap}
        />

        {/* ── Tip bar ── */}
        <div
          className="flex items-center gap-4 rounded-lg px-5 py-3 text-xs"
          style={{
            background: "rgba(13,15,25,0.7)",
            border: "1px solid rgba(200,155,60,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <span className="font-semibold" style={{ color: "#C89B3C", fontFamily: "'Cinzel', Georgia, serif", fontSize: "10px" }}>Hướng dẫn:</span>
          <span style={{ color: "#5C5040", fontFamily: "'Inter', sans-serif" }}>① Click champion trong pool để cầm</span>
          <span style={{ color: "#5C5040", fontFamily: "'Inter', sans-serif" }}>② Click ô hex để đặt xuống</span>
          <span style={{ color: "#5C5040", fontFamily: "'Inter', sans-serif" }}>③ Click champion đang cầm hoặc champion trên board để bỏ</span>
          <span style={{ color: "#5C5040", fontFamily: "'Inter', sans-serif" }}>④ Hover ô hex → <kbd style={{ background: "rgba(200,155,60,0.08)", border: "1px solid rgba(200,155,60,0.2)", borderRadius: "4px", padding: "0 4px", color: "#A89880" }}>✕</kbd> để xóa</span>
          <span className="ml-auto" style={{ color: "#5C5040", fontFamily: "'Inter', sans-serif" }}><kbd style={{ background: "rgba(200,155,60,0.08)", border: "1px solid rgba(200,155,60,0.2)", borderRadius: "4px", padding: "1px 6px", color: "#A89880" }}>Esc</kbd> — hủy đang cầm</span>
        </div>
      </main>
    </div>
  );
};

export default TeamBuilderPage;
