import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, X, Search, ChevronLeft, ChevronRight, ChevronDown, Check, Zap, Shield, Upload, ImageIcon } from "lucide-react";
import TFTHeader from "../../components/teamcomps/TFTHeader";
import RichText from "../../components/RichText";

const BASE = "http://localhost:5000/api";
const API  = `${BASE}/champions`;
const CDN  = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_80,h_80,c_fill/${id}`;
// Square icon for team comp grid (g_auto smart-crops the landscape source)
const CDN_ICON   = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_80,h_80,c_fill,g_auto,q_auto,f_auto/${id}`;
// Landscape thumb for table row
const CDN_THUMB  = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_128,h_64,c_fill,q_auto,f_auto/${id}`;
// Full landscape banner for detail popup (2× native, sharpened)
const CDN_BANNER = (id) => `https://res.cloudinary.com/ecoturre/image/upload/w_512,h_256,c_fill,q_auto:best,f_auto,e_sharpen:60/${id}`;

const COST_COLORS = {
  1: "bg-slate-600 text-slate-100",
  2: "bg-green-700 text-green-100",
  3: "bg-blue-700 text-blue-100",
  4: "bg-purple-700 text-purple-100",
  5: "bg-yellow-600 text-yellow-100",
};
const COST_BORDER = { 1:"border-slate-400", 2:"border-green-500", 3:"border-blue-500", 4:"border-fuchsia-500", 5:"border-amber-400" };
const COST_BG     = { 1:"bg-slate-800",     2:"bg-green-950",     3:"bg-blue-950",     4:"bg-fuchsia-950",     5:"bg-amber-950"    };
const COST_DOT    = { 1:"bg-slate-400",     2:"bg-green-500",     3:"bg-blue-500",     4:"bg-fuchsia-500",     5:"bg-amber-400"    };
const COST_LABEL  = { 1:"text-slate-400",   2:"text-green-500",   3:"text-blue-400",   4:"text-fuchsia-400",  5:"text-amber-400"   };

const EMPTY_FORM = {
  name: "", set: "", cost: 1, slot: "",
  base_image_id: "",
  origins: [],
  classes: [],
  ability: { name: "", type: "active", description: "" },
};

const fetchList = async (endpoint) => {
  const res  = await fetch(`${BASE}/${endpoint}?limit=200`);
  const json = await res.json();
  return json.data?.[endpoint] || [];
};

// ── Image uploader ───────────────────────────────────────────────────────────
const ImageUploader = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res  = await fetch(`${BASE}/upload/champion`, { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload thất bại");
      onChange(json.public_id);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1 font-medium">Ảnh Champion</label>

      {/* Drop zone / preview */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
        className="relative w-full h-32 rounded-lg border-2 border-dashed border-slate-600 hover:border-orange-500 transition-colors cursor-pointer overflow-hidden bg-slate-800/50 select-none"
      >
        {value ? (
          <>
            <img src={CDN_BANNER(value)} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity">
              <Upload size={18} className="text-white" />
              <span className="text-white text-xs font-medium">Đổi ảnh</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
            <ImageIcon size={24} />
            <span className="text-xs">Click hoặc kéo thả ảnh vào đây</span>
            <span className="text-[10px] text-slate-600">PNG, JPG, WebP · tối đa 5MB</span>
          </div>
        )}

        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-2">
            <span className="w-6 h-6 border-2 border-slate-600 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-white text-xs">Đang tải lên Cloudinary...</span>
          </div>
        )}
      </div>

      {uploadError && <p className="text-red-400 text-xs mt-1">{uploadError}</p>}
      {value && !uploading && (
        <p className="text-slate-600 text-[10px] mt-1 font-mono truncate" title={value}>{value}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
};

// ── Multi-select with checkboxes ────────────────────────────────────────────
const MultiSelect = ({ label, options, selected, onChange, loading }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const selectedNames = options
    .filter((o) => selected.includes(o._id))
    .map((o) => o.name);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs text-slate-400 mb-1 font-medium">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-left flex items-center justify-between gap-2 focus:outline-none focus:border-orange-500 hover:border-slate-600"
      >
        <span className="truncate text-white">
          {loading
            ? "Đang tải..."
            : selectedNames.length === 0
              ? <span className="text-slate-500">— Chọn {label} —</span>
              : selectedNames.join(", ")}
        </span>
        <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && !loading && (
        <div className="absolute z-30 top-full mt-1 w-full bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
          {options.length === 0 ? (
            <p className="px-3 py-2 text-xs text-slate-500">Không có dữ liệu</p>
          ) : (
            options.map((opt) => {
              const checked = selected.includes(opt._id);
              return (
                <button
                  key={opt._id}
                  type="button"
                  onClick={() => toggle(opt._id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-800 transition-colors"
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? "bg-orange-500 border-orange-500" : "border-slate-600"}`}>
                    {checked && <Check size={11} className="text-white" />}
                  </span>
                  <span className={checked ? "text-white" : "text-slate-400"}>{opt.name}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

// ── Champion Detail Popup (read-only) ───────────────────────────────────────
const ChampionDetailPopup = ({ champ, onClose, onEdit }) => {
  const cost    = champ.cost;
  const ability = champ.ability;
  const imgId   = champ.base_image_id;
  const border  = COST_BORDER[cost] || "border-slate-600";
  const bg      = COST_BG[cost]     || "bg-slate-800";
  const dot     = COST_DOT[cost]    || "bg-slate-400";
  const label   = COST_LABEL[cost]  || "text-slate-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-[#0f1b27] border-2 ${border} rounded-2xl w-full max-w-md overflow-hidden shadow-2xl`}>

        {/* ── Hero banner: blurred backdrop + sharp portrait ── */}
        <div className="relative h-52 overflow-hidden">
          {imgId ? (
            <>
              {/* Full-width landscape banner */}
              <img
                src={CDN_BANNER(imgId)}
                alt={champ.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </>
          ) : (
            <div className={`absolute inset-0 ${bg} flex items-center justify-center`}>
              <span className="text-7xl font-black text-slate-600 select-none">
                {champ.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Gradient bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b27] via-transparent to-black/10" />

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <button onClick={onEdit} className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 text-slate-300 hover:text-white transition-colors" title="Chỉnh sửa">
              <Pencil size={14} />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 text-slate-300 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>

          {/* Name + cost */}
          <div className="absolute bottom-3 left-4 right-16">
            <h2 className="text-2xl font-black text-white drop-shadow-lg leading-tight">{champ.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-0.5">
                {Array.from({ length: cost }).map((_, i) => (
                  <span key={i} className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                ))}
              </div>
              <span className={`text-xs font-bold ${label}`}>{cost}-Cost · Set {champ.set}</span>
            </div>
          </div>
        </div>

        {/* ── Traits ── */}
        <div className="px-4 pt-3 pb-1 flex flex-wrap gap-1.5">
          {(champ.origins || []).map((o, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 font-medium">{o.name}</span>
          ))}
          {(champ.classes || []).map((c, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50 font-medium">{c.name}</span>
          ))}
        </div>

        {/* ── Ability ── */}
        <div className="px-4 py-3">
          {ability?.name ? (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg ${bg} border ${border} flex items-center justify-center shrink-0`}>
                  {ability.type === "active"
                    ? <Zap size={16} className={label} />
                    : <Shield size={16} className={label} />}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{ability.name}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${ability.type === "active" ? "text-orange-400" : "text-slate-500"}`}>{ability.type}</span>
                </div>
              </div>
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/40">
                <RichText text={ability.description} className="text-sm text-slate-300 leading-relaxed" />
              </div>
            </div>
          ) : (
            <p className="text-slate-600 text-sm text-center py-3">Chưa có dữ liệu ability.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Confirm Dialog ──────────────────────────────────────────────────────────
const ConfirmDialog = ({ name, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="bg-[#1a2636] border border-slate-700 rounded-xl p-6 w-80 text-center">
      <p className="text-white font-semibold mb-1">Xóa champion?</p>
      <p className="text-slate-400 text-sm mb-6">
        <span className="text-orange-400 font-medium">{name}</span> sẽ bị xóa vĩnh viễn.
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={onCancel} className="px-4 py-2 text-sm rounded bg-slate-700 hover:bg-slate-600 text-slate-200">Hủy</button>
        <button onClick={onConfirm} className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white font-medium">Xóa</button>
      </div>
    </div>
  </div>
);

// ── Modal Form ──────────────────────────────────────────────────────────────
const ChampionModal = ({ initial, onSave, onClose }) => {
  const [form, setForm]       = useState(initial || EMPTY_FORM);
  const [origins, setOrigins] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    Promise.all([fetchList("origins"), fetchList("classes")])
      .then(([o, c]) => { setOrigins(o); setClasses(c); })
      .catch(() => {})
      .finally(() => setLoadingRefs(false));
  }, []);

  const setField   = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setAbility = (field, value) => setForm((f) => ({ ...f, ability: { ...f.ability, [field]: value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = {
      ...form,
      cost:   Number(form.cost),
      slot:   form.slot !== "" ? Number(form.slot) : undefined,
      origins: form.origins.length ? form.origins : undefined,
      classes: form.classes.length ? form.classes : undefined,
    };
    try {
      const res  = await fetch(initial?._id ? `${API}/${initial._id}` : API, {
        method:  initial?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Request failed");
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500";
  const labelCls = "block text-xs text-slate-400 mb-1 font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#1a2636] border border-slate-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-white font-semibold">{initial?._id ? "Chỉnh sửa" : "Thêm"} Champion</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name + Set */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tên *</label>
              <input className={inputCls} value={form.name} onChange={(e) => setField("name", e.target.value)} required placeholder="Aatrox" />
            </div>
            <div>
              <label className={labelCls}>Set *</label>
              <input className={inputCls} value={form.set} onChange={(e) => setField("set", e.target.value)} required placeholder="16" />
            </div>
          </div>

          {/* Cost + Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Cost (1–5)</label>
              <select className={inputCls} value={form.cost} onChange={(e) => setField("cost", e.target.value)}>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} Gold</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Slot (pool size)</label>
              <input type="number" min={1} className={inputCls} value={form.slot} onChange={(e) => setField("slot", e.target.value)} placeholder="29" />
            </div>
          </div>

          {/* Origins + Classes — multi-select */}
          <div className="grid grid-cols-2 gap-3">
            <MultiSelect
              label="Origins"
              options={origins}
              selected={form.origins}
              onChange={(v) => setField("origins", v)}
              loading={loadingRefs}
            />
            <MultiSelect
              label="Classes"
              options={classes}
              selected={form.classes}
              onChange={(v) => setField("classes", v)}
              loading={loadingRefs}
            />
          </div>

          {/* Image upload */}
          <ImageUploader
            value={form.base_image_id}
            onChange={(id) => setField("base_image_id", id)}
          />

          {/* Ability */}
          <div className="border border-slate-700 rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ability</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Tên skill</label>
                <input className={inputCls} value={form.ability.name} onChange={(e) => setAbility("name", e.target.value)} placeholder="Infernal Chains" />
              </div>
              <div>
                <label className={labelCls}>Loại</label>
                <select className={inputCls} value={form.ability.type} onChange={(e) => setAbility("type", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="passive">Passive</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Mô tả</label>
              <textarea rows={3} className={inputCls} value={form.ability.description} onChange={(e) => setAbility("description", e.target.value)} placeholder="Aatrox slams his sword..." />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200">Hủy</button>
            <button type="submit" disabled={saving} className="flex-1 py-2 text-sm rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold disabled:opacity-50">
              {saving ? "Đang lưu..." : initial?._id ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Main Page ───────────────────────────────────────────────────────────────
const ChampionCrudPage = () => {
  const [champions, setChampions]   = useState([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [search, setSearch]         = useState("");
  const [costFilter, setCostFilter] = useState("");
  const [loading, setLoading]       = useState(false);

  const [modal, setModal]               = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailChamp, setDetailChamp]   = useState(null);
  const [toast, setToast]               = useState("");

  const LIMIT = 20;

  const fetchChampions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search)     params.set("search", search);
      if (costFilter) params.set("cost", costFilter);
      const res  = await fetch(`${API}?${params}`);
      const json = await res.json();
      setChampions(json.data?.champions || []);
      setTotal(json.data?.total || 0);
    } catch {
      setChampions([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, costFilter]);

  useEffect(() => { fetchChampions(); }, [fetchChampions]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const handleSaved = () => { setModal(null); fetchChampions(); showToast("Lưu thành công!"); };

  const handleDelete = async () => {
    try {
      await fetch(`${API}/${deleteTarget._id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchChampions();
      showToast("Đã xóa champion.");
    } catch { setDeleteTarget(null); }
  };

  // Normalize populated arrays → array of _id strings
  const openEdit = (champ) => {
    setModal({
      data: {
        ...champ,
        origins: (champ.origins || []).map((o) => o?._id ?? o),
        classes: (champ.classes || []).map((c) => c?._id ?? c),
        ability: champ.ability || { name: "", type: "active", description: "" },
      },
    });
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b141d]">
      <TFTHeader />

      <main className="flex-1 px-8 py-6 max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Quản lý Champions</h1>
            <p className="text-slate-400 text-sm mt-0.5">{total} champions trong database</p>
          </div>
          <button onClick={() => setModal({ data: null })} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <Plus size={16} /> Thêm Champion
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              placeholder="Tìm tên champion..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex gap-2">
            {["", 1, 2, 3, 4, 5].map((c) => (
              <button key={c} onClick={() => { setCostFilter(c); setPage(1); }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${costFilter === c ? "bg-orange-600 border-orange-600 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`}>
                {c === "" ? "Tất cả" : `${c}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0f1b27] border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left w-14">Ảnh</th>
                <th className="px-4 py-3 text-left">Tên</th>
                <th className="px-4 py-3 text-left w-16">Cost</th>
                <th className="px-4 py-3 text-left w-12">Set</th>
                <th className="px-4 py-3 text-left w-12">Slot</th>
                <th className="px-4 py-3 text-left">Origins</th>
                <th className="px-4 py-3 text-left">Classes</th>
                <th className="px-4 py-3 text-left">Skill</th>
                <th className="px-4 py-3 text-right w-24">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="text-center py-12 text-slate-500">Đang tải...</td></tr>
              ) : champions.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-12 text-slate-500">Không có dữ liệu</td></tr>
              ) : (
                champions.map((champ) => (
                  <tr key={champ._id} onClick={() => setDetailChamp(champ)} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors cursor-pointer">
                    <td className="px-4 py-2">
                      {champ.base_image_id
                        ? <img src={CDN_THUMB(champ.base_image_id)} alt={champ.name} className="w-16 h-8 rounded object-cover" />
                        : <div className="w-16 h-8 rounded bg-slate-700 flex items-center justify-center text-xs text-slate-400">{champ.name?.[0]}</div>}
                    </td>
                    <td className="px-4 py-2 font-semibold text-white">{champ.name}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${COST_COLORS[champ.cost] || "bg-slate-700 text-slate-300"}`}>{champ.cost}★</span>
                    </td>
                    <td className="px-4 py-2 text-slate-400">{champ.set}</td>
                    <td className="px-4 py-2 text-slate-400">{champ.slot ?? "—"}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {(champ.origins || []).length
                          ? champ.origins.map((o) => <span key={o._id} className="text-xs px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300">{o.name}</span>)
                          : <span className="text-slate-600">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {(champ.classes || []).length
                          ? champ.classes.map((c) => <span key={c._id} className="text-xs px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300">{c.name}</span>)
                          : <span className="text-slate-600">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-slate-400 max-w-[140px] truncate">{champ.ability?.name || "—"}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-end">
                        <button onClick={(e) => { e.stopPropagation(); openEdit(champ); }} className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><Pencil size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(champ); }} className="p-1.5 rounded hover:bg-red-900/40 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
            <span>Trang {page} / {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="p-2 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft size={16} /></button>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="p-2 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </main>

      {modal && (
        <ChampionModal
          initial={modal.data}
          onSave={handleSaved}
          onClose={() => setModal(null)}
        />
      )}

      {detailChamp && (
        <ChampionDetailPopup
          champ={detailChamp}
          onClose={() => setDetailChamp(null)}
          onEdit={() => { setDetailChamp(null); openEdit(detailChamp); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">{toast}</div>
      )}
    </div>
  );
};

export default ChampionCrudPage;
