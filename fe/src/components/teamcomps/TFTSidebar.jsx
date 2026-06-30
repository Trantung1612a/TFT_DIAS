import { useState } from "react";
import { filterGroups } from "../../data/teamComps";

const TFTSidebar = () => {
  const [checked, setChecked] = useState({});

  const toggle = (label) => setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="w-56 shrink-0 bg-[#0f1b27] border-r border-slate-800 p-4">
      <ul className="space-y-1">
        {filterGroups.map((label) => (
          <li key={label}>
            <label className="flex items-center justify-between px-2 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 cursor-pointer">
              {label}
              <input
                type="checkbox"
                checked={!!checked[label]}
                onChange={() => toggle(label)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-blue-600"
              />
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 h-48 border border-dashed border-slate-700 rounded flex items-center justify-center text-center px-4">
        <span className="text-slate-500 text-xs">This website is supported by ads</span>
      </div>
    </aside>
  );
};

export default TFTSidebar;
