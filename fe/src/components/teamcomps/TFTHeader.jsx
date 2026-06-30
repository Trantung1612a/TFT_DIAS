import { ChevronDown, Triangle, Download } from "lucide-react";

const navItems = ["Team Comps", "Champions", "Tier Lists", "Item Builder", "Team Builder", "Database"];

const TFTHeader = () => {
  return (
    <header className="bg-[#0f1b27] border-b border-slate-800 px-6 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Triangle size={20} className="text-orange-500 fill-orange-500" />
          <span className="text-white font-bold text-lg">tftactics</span>
        </div>

        <button className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
          Set 17
          <ChevronDown size={14} />
        </button>

        <nav className="flex items-center gap-6 h-16">
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`h-16 flex items-center text-sm font-medium border-b-2 ${
                i === 0
                  ? "text-white border-orange-500"
                  : "text-slate-400 border-transparent hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
        <Download size={16} />
        Download TFTactics
      </button>
    </header>
  );
};

export default TFTHeader;
