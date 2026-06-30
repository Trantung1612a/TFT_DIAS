import { ChevronDown, Search } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import TFTSidebar from "../../components/teamcomps/TFTSidebar";
import CompRow from "../../components/teamcomps/CompRow";
import { teamComps } from "../../data/teamComps";

const TeamCompsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b141d]">
      <TFTHeader />

      <div className="flex flex-1">
        <TFTSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">TFT Meta Team Comps Tier List</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
                Set 17
                <ChevronDown size={14} />
              </button>
              <span className="bg-blue-900/40 text-blue-300 border border-blue-800 rounded px-3 py-1.5 text-sm font-medium">
                Patch 17.6
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4 bg-slate-900/60 border border-slate-800 rounded-lg p-3">
            <button className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700">
              Champions
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700">
              Traits
              <ChevronDown size={14} />
            </button>
            <div className="flex-1 flex items-center gap-2 bg-slate-800 border border-slate-700 rounded px-3 py-1.5">
              <Search size={14} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
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
