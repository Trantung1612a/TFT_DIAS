import { NavLink } from "react-router-dom";
import { LayoutDashboard, Scroll } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
];

const Sidebar = () => {
  return (
    <aside
      className="w-64 flex flex-col shrink-0"
      style={{
        background: "#13151F",
        borderRight: "1px solid rgba(200,155,60,0.15)",
      }}
    >
      {/* Brand */}
      <div
        className="h-16 flex items-center justify-center gap-2.5"
        style={{ borderBottom: "1px solid rgba(200,155,60,0.15)" }}
      >
        <div
          className="w-7 h-7 rounded flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #C89B3C, #8A6B28)",
            boxShadow: "0 0 10px rgba(200,155,60,0.35)",
          }}
        >
          <Scroll size={14} className="text-black" />
        </div>
        <span
          className="font-bold text-sm tracking-widest"
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            color: "#C89B3C",
            letterSpacing: "0.12em",
          }}
        >
          MYTHIC DIAS
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive ? "active-nav" : "inactive-nav"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(200,155,60,0.12)" : "transparent",
              border: isActive
                ? "1px solid rgba(200,155,60,0.3)"
                : "1px solid transparent",
              color: isActive ? "#C89B3C" : "#A89880",
              fontFamily: "'Inter', sans-serif",
            })}
            onMouseEnter={(e) => {
              const link = e.currentTarget;
              if (!link.classList.contains("active-nav")) {
                link.style.background = "rgba(200,155,60,0.06)";
                link.style.color = "#F0E6D2";
              }
            }}
            onMouseLeave={(e) => {
              const link = e.currentTarget;
              if (!link.classList.contains("active-nav")) {
                link.style.background = "transparent";
                link.style.color = "#A89880";
              }
            }}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid rgba(200,155,60,0.1)" }}
      >
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#3C3020" }}
        >
          Season XVI
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
