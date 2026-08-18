import { ChevronDown, Triangle, LogIn, LogOut, User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Team Comps", to: "/team-comps" },
  { label: "Champions", to: "/champions" },
  { label: "Database", to: "/database" },
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
    <header className="bg-[#0f1b27] border-b border-slate-800 px-6 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <Triangle size={20} className="text-orange-500 fill-orange-500" />
          <span className="text-white font-bold text-lg">tftactics</span>
        </NavLink>

        {/* Set selector */}
        <button className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
          Set 17
          <ChevronDown size={14} />
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-6 h-16">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `h-16 flex items-center text-sm font-medium border-b-2 transition-colors ${isActive
                  ? "text-white border-orange-500"
                  : "text-slate-400 border-transparent hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded border border-slate-700 transition-colors"
          >
            <User size={16} />
            {user.fullName}
            <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1a2836] border border-slate-700 rounded-lg shadow-xl py-1 z-50">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <User size={14} />
                Dashboard
              </Link>
              <hr className="border-slate-700 my-1" />
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
        >
          <LogIn size={16} />
          Sign In
        </Link>
      )}
    </header>
  );
};

export default TFTHeader;

