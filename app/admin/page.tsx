"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, X, Upload, ToggleLeft, ToggleRight, ArrowUpRight, ImagePlus } from "lucide-react";

type GrassType = {
  id: string;
  name: string;
  description: string | null;
  sun_requirement: string | null;
  image_url: string | null;
  image_urls: string[];
  created_at: string;
};

type Product = {
  id: string;
  grass_type_id: string;
  format: string;
  sq_ft_coverage: number;
  price: number;
  weight_lbs: number | null;
  is_available: boolean;
  created_at: string;
  grass_types: { name: string } | null;
};

const FORMATS = ["Full Pallet", "Half Pallet", "Roll", "Mini Pallet"];
const SUN_OPTIONS = ["Full Sun", "Partial Shade", "Mixed Sun", "Shade Tolerant"];

export default function AdminPage() {
  const [tab, setTab] = useState<"grass-types" | "products">("grass-types");
  const [grassTypes, setGrassTypes] = useState<GrassType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Grass type modal state ────────────────────────────────────────────────────
  const [gtModal, setGtModal] = useState(false);
  const [editingGt, setEditingGt] = useState<GrassType | null>(null);
  const [gtForm, setGtForm] = useState({ name: "", description: "", sun_requirement: "" });
  // savedUrls: existing URLs already in the DB / already uploaded this session
  // newFiles: files selected but not yet uploaded
  const [savedUrls, setSavedUrls] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<{ file: File; preview: string }[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Product modal state ───────────────────────────────────────────────────────
  const [prodModal, setProdModal] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({ grass_type_id: "", format: "", sq_ft_coverage: "", price: "", weight_lbs: "", is_available: true });
  const [savingProd, setSavingProd] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const [gtRes, prodRes] = await Promise.all([
        fetch("/api/admin/grass-types"),
        fetch("/api/admin/products"),
      ]);
      const [gtData, prodData] = await Promise.all([gtRes.json(), prodRes.json()]);
      if (gtRes.ok) setGrassTypes(gtData);
      if (prodRes.ok) setProducts(prodData);
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  // ── Grass type handlers ───────────────────────────────────────────────────────

  function openAddGt() {
    setEditingGt(null);
    setGtForm({ name: "", description: "", sun_requirement: "" });
    setSavedUrls([]);
    setNewFiles([]);
    setUrlInput("");
    setGtModal(true);
  }

  function openEditGt(gt: GrassType) {
    setEditingGt(gt);
    setGtForm({ name: gt.name, description: gt.description ?? "", sun_requirement: gt.sun_requirement ?? "" });
    // Prefer the image_urls array; fall back to image_url for older records
    setSavedUrls(gt.image_urls?.length ? gt.image_urls : gt.image_url ? [gt.image_url] : []);
    setNewFiles([]);
    setUrlInput("");
    setGtModal(true);
  }

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const entries = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setNewFiles(prev => [...prev, ...entries]);
    // reset so same files can be re-selected if removed
    e.target.value = "";
  }

  function removeNewFile(index: number) {
    setNewFiles(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function removeSavedUrl(index: number) {
    setSavedUrls(prev => prev.filter((_, i) => i !== index));
  }

  function addUrlInput() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setSavedUrls(prev => [...prev, trimmed]);
    setUrlInput("");
  }

  async function uploadAllNewFiles(): Promise<string[]> {
    if (!newFiles.length) return [];
    setUploading(true);
    const results: string[] = [];
    for (const { file } of newFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) { setError("One or more image uploads failed."); setUploading(false); return []; }
      const { url } = await res.json();
      results.push(url);
    }
    setUploading(false);
    return results;
  }

  async function saveGrassType(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const uploadedUrls = await uploadAllNewFiles();
    if (newFiles.length && !uploadedUrls.length) { setSaving(false); return; }

    const image_urls = [...savedUrls, ...uploadedUrls];
    const image_url = image_urls[0] ?? null;

    const apiUrl = editingGt ? `/api/admin/grass-types/${editingGt.id}` : "/api/admin/grass-types";
    const method = editingGt ? "PUT" : "POST";

    // Try saving with image_urls array first; if the column doesn't exist yet fall back to image_url only
    let res = await fetch(apiUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...gtForm, image_url, image_urls }),
    });

    if (!res.ok) {
      const d = await res.json();
      // Retry without image_urls if the column doesn't exist in the DB yet
      if (d.error?.includes("image_urls")) {
        res = await fetch(apiUrl, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...gtForm, image_url }),
        });
      }
      if (!res.ok) {
        const d2 = await res.json();
        setError(d2.error ?? "Save failed.");
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    await fetchAll();
    setGtModal(false);
  }

  async function deleteGt(id: string) {
    if (!confirm("Delete this grass type? All linked products will also be deleted.")) return;
    const res = await fetch(`/api/admin/grass-types/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json(); setError(d.error ?? "Delete failed."); return; }
    setGrassTypes(prev => prev.filter(g => g.id !== id));
  }

  // ── Product handlers ──────────────────────────────────────────────────────────

  function openAddProd() {
    setEditingProd(null);
    setProdForm({ grass_type_id: grassTypes[0]?.id ?? "", format: FORMATS[0], sq_ft_coverage: "", price: "", weight_lbs: "", is_available: true });
    setProdModal(true);
  }

  function openEditProd(p: Product) {
    setEditingProd(p);
    setProdForm({ grass_type_id: p.grass_type_id, format: p.format, sq_ft_coverage: String(p.sq_ft_coverage), price: String(p.price), weight_lbs: p.weight_lbs != null ? String(p.weight_lbs) : "", is_available: p.is_available });
    setProdModal(true);
  }

  async function saveProd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSavingProd(true);
    setError(null);
    const payload = {
      grass_type_id: prodForm.grass_type_id,
      format: prodForm.format,
      sq_ft_coverage: parseFloat(prodForm.sq_ft_coverage),
      price: parseFloat(prodForm.price),
      weight_lbs: prodForm.weight_lbs !== "" ? parseFloat(prodForm.weight_lbs) : null,
      is_available: prodForm.is_available,
    };
    const url = editingProd ? `/api/admin/products/${editingProd.id}` : "/api/admin/products";
    const method = editingProd ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSavingProd(false);
    if (!res.ok) { const d = await res.json(); setError(d.error ?? "Save failed."); return; }
    await fetchAll();
    setProdModal(false);
  }

  async function deleteProd(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json(); setError(d.error ?? "Delete failed."); return; }
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  async function toggleAvailable(p: Product) {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_available: !p.is_available }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_available: updated.is_available } : x));
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  const allImages = (gt: GrassType) =>
    gt.image_urls?.length ? gt.image_urls : gt.image_url ? [gt.image_url] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <span className="font-black text-gray-900 text-lg tracking-tight">Sod Admin</span>
        </div>
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
          View Site <ArrowUpRight size={14} />
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)}><X size={16} /></button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
          {(["grass-types", "products"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t === "grass-types" ? "Grass Types" : "Products"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium">Loading...</div>
        ) : tab === "grass-types" ? (
          // ── Grass Types Tab ─────────────────────────────────────────────────
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">Grass Types</h2>
                <p className="text-sm text-gray-500 mt-0.5">{grassTypes.length} varieties</p>
              </div>
              <button onClick={openAddGt} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors">
                <Plus size={16} /> Add Grass Type
              </button>
            </div>

            {grassTypes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                <p className="font-bold mb-1">No grass types yet</p>
                <p className="text-sm">Add your first grass type to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {grassTypes.map(gt => {
                  const imgs = allImages(gt);
                  return (
                    <div key={gt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      {/* Image strip */}
                      <div className="aspect-[16/9] bg-gray-100 relative">
                        {imgs[0] ? (
                          <img src={imgs[0]} alt={gt.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-sm">No Image</div>
                        )}
                        {imgs.length > 1 && (
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            +{imgs.length - 1} more
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-black text-gray-900 text-lg leading-tight">{gt.name}</h3>
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => openEditGt(gt)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                              <Pencil size={15} />
                            </button>
                            <button onClick={() => deleteGt(gt.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                        {gt.sun_requirement && (
                          <span className="inline-block text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full mb-2">{gt.sun_requirement}</span>
                        )}
                        {gt.description && (
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{gt.description}</p>
                        )}
                        <p className="text-[10px] text-gray-300 mt-3 font-mono">{gt.id}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // ── Products Tab ────────────────────────────────────────────────────
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">Products</h2>
                <p className="text-sm text-gray-500 mt-0.5">{products.length} listings</p>
              </div>
              <button onClick={openAddProd} disabled={grassTypes.length === 0} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <Plus size={16} /> Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                <p className="font-bold mb-1">No products yet</p>
                <p className="text-sm">Add a grass type first, then create products for it.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Grass Type</th>
                      <th className="text-left px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Format</th>
                      <th className="text-right px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Sq Ft</th>
                      <th className="text-right px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Price</th>
                      <th className="text-right px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Weight (lbs)</th>
                      <th className="text-right px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">$/sqft</th>
                      <th className="text-center px-5 py-3.5 font-bold text-gray-500 text-xs uppercase tracking-wider">Available</th>
                      <th className="px-5 py-3.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900">{p.grass_types?.name ?? "—"}</td>
                        <td className="px-5 py-4 text-gray-600">{p.format}</td>
                        <td className="px-5 py-4 text-right text-gray-600">{p.sq_ft_coverage.toLocaleString()}</td>
                        <td className="px-5 py-4 text-right font-bold text-gray-900">${Number(p.price).toFixed(2)}</td>
                        <td className="px-5 py-4 text-right text-gray-600">{p.weight_lbs != null ? `${p.weight_lbs.toLocaleString()} lbs` : "—"}</td>
                        <td className="px-5 py-4 text-right text-gray-500">${(Number(p.price) / Number(p.sq_ft_coverage)).toFixed(2)}</td>
                        <td className="px-5 py-4 text-center">
                          <button onClick={() => toggleAvailable(p)} className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors">
                            {p.is_available
                              ? <><ToggleRight size={20} className="text-green-600" /><span className="text-green-600">Yes</span></>
                              : <><ToggleLeft size={20} className="text-gray-300" /><span className="text-gray-400">No</span></>
                            }
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1 justify-end">
                            <button onClick={() => openEditProd(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                              <Pencil size={15} />
                            </button>
                            <button onClick={() => deleteProd(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Grass Type Modal ──────────────────────────────────────────────────────── */}
      {gtModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h3 className="font-black text-gray-900">{editingGt ? "Edit Grass Type" : "Add Grass Type"}</h3>
              <button onClick={() => setGtModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={saveGrassType} className="p-6 space-y-5 overflow-y-auto">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Name *</label>
                <input
                  required
                  value={gtForm.name}
                  onChange={e => setGtForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Premium Bermuda"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              {/* Sun Requirement */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sun Requirement</label>
                <select
                  value={gtForm.sun_requirement}
                  onChange={e => setGtForm(f => ({ ...f, sun_requirement: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                >
                  <option value="">Select...</option>
                  {SUN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={gtForm.description}
                  onChange={e => setGtForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of this grass variety..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Images {savedUrls.length + newFiles.length > 0 && <span className="text-green-700">({savedUrls.length + newFiles.length})</span>}
                </label>

                {/* Existing + pending preview grid */}
                {(savedUrls.length > 0 || newFiles.length > 0) && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {savedUrls.map((url, i) => (
                      <div key={url} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-1 left-1 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Cover</span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeSavedUrl(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {newFiles.map(({ preview }, i) => (
                      <div key={preview} className="relative aspect-square rounded-xl overflow-hidden group border border-dashed border-green-300">
                        <img src={preview} alt="" className="w-full h-full object-cover opacity-80" />
                        <span className="absolute bottom-1 left-1 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">New</span>
                        <button
                          type="button"
                          onClick={() => removeNewFile(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload drop zone */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium hover:border-green-400 hover:text-green-600 transition-colors"
                >
                  <ImagePlus size={18} />
                  {savedUrls.length + newFiles.length === 0 ? "Upload images" : "Add more images"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFilePick}
                />

                {/* URL input */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addUrlInput())}
                    placeholder="Or paste an image URL and press Enter"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addUrlInput}
                    disabled={!urlInput.trim()}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-colors disabled:opacity-40"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setGtModal(false)} className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploading} className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-green-800 transition-colors disabled:opacity-60">
                  {uploading ? "Uploading..." : saving ? "Saving..." : editingGt ? "Save Changes" : "Add Grass Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Product Modal ─────────────────────────────────────────────────────────── */}
      {prodModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-gray-900">{editingProd ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setProdModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={saveProd} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Grass Type *</label>
                <select
                  required
                  value={prodForm.grass_type_id}
                  onChange={e => setProdForm(f => ({ ...f, grass_type_id: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                >
                  {grassTypes.map(gt => <option key={gt.id} value={gt.id}>{gt.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Format *</label>
                <select
                  required
                  value={prodForm.format}
                  onChange={e => setProdForm(f => ({ ...f, format: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                >
                  {FORMATS.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sq Ft Coverage *</label>
                  <input
                    required type="number" min="1" step="0.1"
                    value={prodForm.sq_ft_coverage}
                    onChange={e => setProdForm(f => ({ ...f, sq_ft_coverage: e.target.value }))}
                    placeholder="e.g. 450"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price ($) *</label>
                  <input
                    required type="number" min="0" step="0.01"
                    value={prodForm.price}
                    onChange={e => setProdForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 250.00"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Weight per Unit (lbs)</label>
                <input
                  type="number" min="0" step="0.1"
                  value={prodForm.weight_lbs}
                  onChange={e => setProdForm(f => ({ ...f, weight_lbs: e.target.value }))}
                  placeholder="e.g. 2000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              {prodForm.sq_ft_coverage && prodForm.price && (
                <p className="text-xs text-gray-400 font-medium">
                  Price per sq ft: <span className="text-green-700 font-bold">${(parseFloat(prodForm.price) / parseFloat(prodForm.sq_ft_coverage)).toFixed(3)}</span>
                </p>
              )}

              <button
                type="button"
                onClick={() => setProdForm(f => ({ ...f, is_available: !f.is_available }))}
                className="flex items-center gap-2 text-sm font-bold text-gray-700"
              >
                {prodForm.is_available
                  ? <ToggleRight size={24} className="text-green-600" />
                  : <ToggleLeft size={24} className="text-gray-300" />
                }
                {prodForm.is_available ? "Available" : "Out of Stock"}
              </button>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setProdModal(false)} className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={savingProd} className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-green-800 transition-colors disabled:opacity-60">
                  {savingProd ? "Saving..." : editingProd ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
