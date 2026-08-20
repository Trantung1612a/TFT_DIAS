import { useState } from "react";
import { Filter } from "lucide-react";

const filterGroups = ["Standard", "Slow Roll", "Fast 8/9", "Emblem", "Augment"];

const TFTSidebar = () => {
  const [checked, setChecked] = useState({});

  const toggle = (label) =>
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside
      className="w-56 shrink-0 p-4 flex flex-col"
      style={{
        background: "#0B0C10",
        borderRight: "1px solid rgba(200,155,60,0.15)",
      }}
    >
      {/* Section title */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={12} style={{ color: "#C89B3C" }} />
        <span className="section-label" style={{ color: "#8A6B28" }}>
          Filters
        </span>
      </div>

      {/* Filter items */}
      <ul className="space-y-1">
        {filterGroups.map((label) => (
          <li key={label}>
            <label
              className="flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-all duration-200 group"
              style={{
                background: checked[label]
                  ? "rgba(200,155,60,0.08)"
                  : "transparent",
                border: checked[label]
                  ? "1px solid rgba(200,155,60,0.25)"
                  : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!checked[label]) {
                  e.currentTarget.style.background = "rgba(200,155,60,0.05)";
                  e.currentTarget.style.borderColor = "rgba(200,155,60,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (!checked[label]) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }
              }}
            >
              <span
                className="text-sm transition-colors duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: checked[label] ? "#F0E6D2" : "#A89880",
                }}
              >
                {label}
              </span>
              {/* Custom Gold Checkbox */}
              <div className="relative w-4 h-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={!!checked[label]}
                  onChange={() => toggle(label)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded transition-all duration-200 flex items-center justify-center"
                  style={{
                    background: checked[label]
                      ? "linear-gradient(135deg, #C89B3C, #8A6B28)"
                      : "transparent",
                    border: checked[label]
                      ? "1px solid #C89B3C"
                      : "1px solid rgba(200,155,60,0.3)",
                    boxShadow: checked[label]
                      ? "0 0 8px rgba(200,155,60,0.4)"
                      : "none",
                  }}
                >
                  {checked[label] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#0B0C10"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="divider-gold my-4" />

      {/* Decorative archive panel */}
      <div
        className="flex-1 rounded-lg flex flex-col items-center justify-center p-4 text-center"
        style={{
          background: "rgba(200,155,60,0.03)",
          border: "1px solid rgba(200,155,60,0.15)",
          minHeight: "140px",
        }}
      >
        {/* Runic decorative element */}
        <div
          className="w-10 h-10 mb-3 rounded flex items-center justify-center"
          style={{
            background: "rgba(200,155,60,0.08)",
            border: "1px solid rgba(200,155,60,0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "16px",
              color: "#8A6B28",
            }}
          >
            ✦
          </span>
        </div>
        <span
          className="text-xs leading-relaxed"
          style={{ color: "#5C5040", fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.05em" }}
        >
          The Archives
          <br />
          <span style={{ fontSize: "10px" }}>Season XVI</span>
        </span>
      </div>
    </aside>
  );
};

export default TFTSidebar;
