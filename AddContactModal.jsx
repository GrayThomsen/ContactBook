import { useEffect, useState } from "react";

export default function AddContactModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    firstname: "", lastname: "", mail: "",
    tlf: "", company: "", position: ""
  });

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);      // Pass data up to App
    setForm({ firstname:"", lastname:"", mail:"", tlf:"", company:"", position:"" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div
        role="dialog" aria-modal="true" aria-labelledby="add-contact-title"
        className="fixed inset-0 grid place-items-center p-4"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 id="add-contact-title" className="text-lg font-semibold">Ny kontakt</h2>
            <button type="button" onClick={onClose} className="p-2 rounded hover:bg-slate-100" aria-label="Luk">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" name="firstname" placeholder="Fornavn" value={form.firstname} onChange={handleChange} required />
            <input className="border rounded-lg px-3 py-2" name="lastname"  placeholder="Efternavn" value={form.lastname}  onChange={handleChange} required />
            <input className="border rounded-lg px-3 py-2 md:col-span-2" name="company" placeholder="Virksomhed" value={form.company} onChange={handleChange} />
            <input className="border rounded-lg px-3 py-2 md:col-span-2" name="position" placeholder="Stilling" value={form.position} onChange={handleChange} />
            <input className="border rounded-lg px-3 py-2" name="mail" placeholder="Email" type="email" value={form.mail} onChange={handleChange} />
            <input className="border rounded-lg px-3 py-2" name="tlf"  placeholder="Telefon" value={form.tlf} onChange={handleChange} />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2">Annullér</button>
            <button type="submit" className="rounded-lg bg-[#0A66C2] px-4 py-2 text-white hover:bg-[#004182]">
              Tilføj
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
