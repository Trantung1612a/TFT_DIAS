import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <span className="text-xl font-bold text-blue-600">TFT DIAS</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
