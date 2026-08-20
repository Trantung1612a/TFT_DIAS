import { ChevronDown, BookOpen, LogIn, LogOut, User, Scroll } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Team Comps", to: "/team-comps" },
  { label: "Champions", to: "/champions" },
  { label: "Origins", to: "/database" },
  { label: "Team Builder", to: "/team-builder" },
  { label: "Admin", to: "/admin/champions" },
];

const TFTHeader = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className="px-6 flex items-center justify-between h-16 shrink-0 relative"
      style={{
        background: "linear-gradient(180deg, #0B0C10 0%, #13151F 100%)",
        borderBottom: "1px solid rgba(200,155,60,0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Subtle gold top-line glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(200,155,60,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="flex items-center gap-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #C89B3C, #8A6B28)",
              boxShadow: "0 0 12px rgba(200,155,60,0.4)",
            }}
          >
            <Scroll size={16} className="text-black" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-base tracking-widest"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                color: "#C89B3C",
                letterSpacing: "0.15em",
              }}
            >
              MYTHIC
            </span>
            <span
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cinzel', Georgia, serif", color: "#A89880" }}
            >
              Archives
            </span>
          </div>
        </NavLink>

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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(200,155,60,0.15)";
            e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(200,155,60,0.08)";
            e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)";
          }}
        >
          <BookOpen size={12} style={{ color: "#C89B3C" }} />
          Season XVI
          <ChevronDown size={12} style={{ color: "#C89B3C" }} />
        </button>

        <nav className="flex items-center gap-1 h-16">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `h-16 flex items-center px-3 text-sm font-medium border-b-2 transition-all duration-200 relative ${isActive
                  ? "border-[#C89B3C] text-[#F0E6D2]"
                  : "border-transparent text-[#A89880] hover:text-[#F0E6D2]"
                }`
              }
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px" }}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, #C89B3C, transparent)",
                        filter: "blur(1px)",
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded transition-all duration-200"
            style={{
              background: "rgba(200,155,60,0.08)",
              border: "1px solid rgba(200,155,60,0.25)",
              color: "#F0E6D2",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,155,60,0.15)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.5)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(200,155,60,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(200,155,60,0.08)";
              e.currentTarget.style.borderColor = "rgba(200,155,60,0.25)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #C89B3C, #8A6B28)", color: "#0B0C10" }}
            >
              {user.fullName?.[0]?.toUpperCase()}
            </div>
            {user.fullName}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              style={{ color: "#C89B3C" }}
            />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-lg shadow-2xl py-1 z-50 animate-fade-in"
              style={{
                background: "rgba(13, 15, 25, 0.95)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(200,155,60,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(200,155,60,0.1)",
              }}
            >
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors"
                style={{ color: "#A89880", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,155,60,0.08)";
                  e.currentTarget.style.color = "#F0E6D2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#A89880";
                }}
              >
                <User size={14} style={{ color: "#C89B3C" }} />
                Dashboard
              </Link>
              <div className="divider-gold my-1" />
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm transition-colors"
                style={{ color: "#8C1616", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(140,22,22,0.12)";
                  e.currentTarget.style.color = "#C44";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#8C1616";
                }}
              >
                <LogOut size={14} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #C89B3C, #8A6B28)",
            color: "#0B0C10",
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "11px",
            letterSpacing: "0.05em",
            boxShadow: "0 0 16px rgba(200,155,60,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(200,155,60,0.5)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 16px rgba(200,155,60,0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <LogIn size={14} />
          Enter the Archives
        </Link>
      )}
    </header>
  );
};

export default TFTHeader;
