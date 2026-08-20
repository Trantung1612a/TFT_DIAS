import { ChevronDown, Search, Scroll } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import TFTSidebar from "../../components/teamcomps/TFTSidebar";
import CompRow from "../../components/teamcomps/CompRow";

// TODO: Connect to API — teamComps data will be fetched from backend
const teamComps = [];

const TeamCompsPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #0B0C10 0%, #1A1C29 60%, #0B0C10 100%)" }}
    >
      <TFTHeader />

      <div className="flex flex-1">
        <TFTSidebar />

        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Scroll size={14} style={{ color: "#C89B3C" }} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#8A6B28" }}
                >
                  Season XVI · Mythic Archives
                </span>
              </div>
              <h1
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  color: "#F0E6D2",
                  letterSpacing: "0.04em",
                  textShadow: "0 0 24px rgba(200,155,60,0.25)",
                }}
              >
                Meta Team Comps Tier List
              </h1>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1.5 text-sm rounded px-3 py-1.5 transition-all duration-200"
                style={{
                  background: "rgba(200,155,60,0.08)",
                  border: "1px solid rgba(200,155,60,0.25)",
                  color: "#F0E6D2",
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                }}
              >
                Season XVI
                <ChevronDown size={13} style={{ color: "#C89B3C" }} />
              </button>
              <span
                className="rounded px-3 py-1.5 text-sm font-medium"
                style={{
                  background: "rgba(10,200,185,0.1)",
                  border: "1px solid rgba(10,200,185,0.3)",
                  color: "#0AC8B9",
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                }}
              >
                Patch 16.1
              </span>
            </div>
          </div>

          {/* Filter bar */}
          <div
            className="flex items-center gap-3 mb-5 rounded-lg p-3"
            style={{
              background: "rgba(13,15,25,0.7)",
              border: "1px solid rgba(200,155,60,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <button
              className="flex items-center gap-1.5 text-sm rounded px-3 py-1.5 transition-all duration-200"
              style={{
                background: "rgba(200,155,60,0.05)",
                border: "1px solid rgba(200,155,60,0.2)",
                color: "#A89880",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.45)";
                e.currentTarget.style.color = "#F0E6D2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.2)";
                e.currentTarget.style.color = "#A89880";
              }}
            >
              Champions
              <ChevronDown size={13} style={{ color: "#C89B3C" }} />
            </button>
            <button
              className="flex items-center gap-1.5 text-sm rounded px-3 py-1.5 transition-all duration-200"
              style={{
                background: "rgba(200,155,60,0.05)",
                border: "1px solid rgba(200,155,60,0.2)",
                color: "#A89880",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.45)";
                e.currentTarget.style.color = "#F0E6D2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.2)";
                e.currentTarget.style.color = "#A89880";
              }}
            >
              Traits
              <ChevronDown size={13} style={{ color: "#C89B3C" }} />
            </button>

            {/* Search */}
            <div
              className="flex-1 flex items-center gap-2 rounded px-3 py-1.5 transition-all duration-200"
              style={{
                background: "rgba(200,155,60,0.04)",
                border: "1px solid rgba(200,155,60,0.15)",
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.45)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(200,155,60,0.1)";
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,155,60,0.15)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Search size={14} style={{ color: "#8A6B28" }} />
              <input
                type="text"
                placeholder="Search team comps..."
                className="bg-transparent text-sm outline-none w-full"
                style={{
                  color: "#F0E6D2",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Comp list */}
          <div className="space-y-2.5">
            {teamComps.map((comp) => (
              <CompRow key={comp.name} comp={comp} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamCompsPage;
