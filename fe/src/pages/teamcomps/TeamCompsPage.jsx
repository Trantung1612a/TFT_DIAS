import { ChevronDown, Search } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import TFTSidebar from "../../components/teamcomps/TFTSidebar";
import CompRow from "../../components/teamcomps/CompRow";

// TODO: Replace with API fetch when backend endpoint is ready
const c = (name, cost, stars) => ({ name, cost, stars });
const teamComps = [
  {
    tier: "S",
    trend: "up",
    name: "Space Groove Replicators",
    tags: [
      { label: "Fast 8", type: "fast" },
      { label: "Emblem", type: "emblem" },
    ],
    champions: [
      c("Gwen", 4), c("Pantheon", 1), c("Ornn", 3), c("Nami", 1),
      c("Riven", 2), c("Tahm Kench", 2), c("Blitzcrank", 4), c("Shen", 5),
    ],
  },
  {
    tier: "S",
    name: "Dark Stars",
    tags: [
      { label: "Fast 8", type: "fast" },
      { label: "Emblem", type: "emblem" },
    ],
    champions: [
      c("Chogath", 1), c("Mordekaiser", 4), c("Kaisa", 4), c("Aurelion Sol", 5),
      c("Karma", 2), c("Tahm Kench", 2), c("Thresh", 3), c("Jhin", 5),
    ],
  },
  {
    tier: "S",
    name: "Meeple Voyagers",
    tags: [{ label: "Slow Roll (6)", type: "slow" }],
    champions: [
      c("Poppy", 1), c("Gnar", 1, 3), c("Meeple", 2), c("Karma", 2),
      c("Rammus", 3), c("Thresh", 3), c("Bard", 4), c("Jhin", 5),
    ],
  },
  {
    tier: "S",
    name: "Primordian Challengers",
    tags: [{ label: "Slow Roll (6)", type: "slow" }],
    champions: [
      c("Briar", 1), c("RekSai", 2), c("Akali", 3, 3), c("Belveth", 4, 3),
      c("Jinx", 4, 3), c("Maokai", 3), c("Rhaast", 5, 3), c("Kindred", 5, 3),
    ],
  },
  {
    tier: "S",
    name: "Psionic Marauders",
    tags: [{ label: "Fast 8", type: "fast" }],
    champions: [
      c("Belveth", 4), c("Gragas", 1), c("Maokai", 3), c("Urgot", 2),
      c("Kindred", 5), c("Master Yi", 4), c("Tahm Kench", 2), c("Flora", 3),
    ],
  },
];

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
