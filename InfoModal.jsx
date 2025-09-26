import { useEffect, useMemo } from "react";
// createPortal is used to render the modal, without being part of the DOM
import { createPortal } from "react-dom";

export default function InfoModal({ open, contact, onClose }) {
  if (!open || !contact) return null;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const c = useMemo(() => {
    const person = { ...contact };
    person.firstname = person.firstname ?? person.firstName ?? "";
    person.lastname  = person.lastname ?? person.lastName ?? "";
    person.company   = person.company ?? person.virksomhed ?? "";
    person.position  = person.position ?? person.stilling ?? "";
    person.email     = person.email ?? person.mail ?? "";
    person.phone     = person.phone ?? person.telefon ?? person.tlf ?? "";
    return person;
  }, [contact]);

  const Input = ({ label, value, colSpan = 1 }) => (
    <div className={colSpan === 2 ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={value || ""}
        className="w-full rounded-xl border px-3 py-2 outline-none shadow-sm
                   disabled:bg-slate-50 disabled:text-slate-700"
      />
    </div>
  );

  const modal = (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Wrapper matches AddContactModal centering */}
      <div className="fixed inset-0 z-[51] grid place-items-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5">
            <h2 className="text-lg font-semibold">
              {[c.firstname, c.lastname].filter(Boolean).join(" ") || "Kontaktinfo"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-slate-100"
              aria-label="Luk"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-2 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Fornavn" value={c.firstname} />
            <Input label="Efternavn" value={c.lastname} />
            <Input label="Virksomhed" value={c.company} colSpan={2} />
            <Input label="Stilling" value={c.position} colSpan={2} />
            <Input label="Email" value={c.email} />
            <Input label="Telefon" value={c.phone} />

            {/* Any extras */}
            {Object.entries(contact)
              .filter(([k, v]) => {
                const hidden = new Set([
                  "id","firstname","firstName","lastname","lastName",
                  "company","virksomhed","position","stilling",
                  "email","mail","phone","telefon","tlf",
                ]);
                return !hidden.has(k) && v != null && String(v).trim() !== "";
              })
              .map(([k, v]) => (
                <Input key={k}
                  label={k.replace(/_/g," ").replace(/([a-z])([A-Z])/g,"$1 $2")
                          .replace(/\b\w/g,(ch)=>ch.toUpperCase())}
                  value={String(v)}
                />
              ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 pb-5 pt-3">
            <button onClick={onClose} className="rounded-lg border px-4 py-2 hover:bg-slate-100">
              Luk
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Mount at <body> so it's always centered relative to the viewport
  return createPortal(modal, document.body);
}
