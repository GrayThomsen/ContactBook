import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Welcome from "../welcome";
import { Button } from "../welcome";
import ContactList from "../contacts";
import { contacts } from "./data/contactdata";

import { useMemo, useState } from "react";
import { contacts as seed } from "./data/contactdata";

const fullName = (c) => `${c.firstname} ${c.lastname}`.trim();
const initials = (c) =>
  fullName(c)
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function App() {
  const [query, setQuery] = useState("");

  // Filter + group by first letter of full name (as in your mockup)
  const grouped = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = seed.filter((c) =>
      [fullName(c), c.company, c.position, c.mail, String(c.tlf)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );

    const map = new Map();
    filtered.forEach((c) => {
      const letter = fullName(c).charAt(0).toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(c);
    });

    // Sort letters A→Z and contacts A→Z within each group
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, list]) => [
        letter,
        list.sort((a, b) => fullName(a).localeCompare(fullName(b))),
      ]);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F3F2EF] text-slate-900">
      {/* Top Bar (LinkedIn-ish) */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[6px] bg-[#0A66C2] text-white grid place-items-center font-bold">
              in
            </div>
            <span className="text-xl font-semibold">Contact</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <span className="hover:text-slate-900 cursor-pointer">
              Startside
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              Dit netværk
            </span>
            <span className="hover:text-slate-900 cursor-pointer">Job</span>
            <span className="hover:text-slate-900 cursor-pointer">
              Beskeder
            </span>
            <span className="hover:text-slate-900 cursor-pointer">
              Notifikationer
            </span>
          </nav>
        </div>
      </header>

      {/* Search */}
      <div className="mx-auto max-w-2xl px-4 py-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søg"
          className="w-full rounded-full border border-slate-300 bg-white px-5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />
      </div>

      {/* Grouped contact list */}
      <main className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4 md:p-6">
          {grouped.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              Ingen kontakter matcher din søgning.
            </div>
          )}

          {grouped.map(([letter, list]) => (
            <section
              key={letter}
              className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr] gap-4 md:gap-6"
            >
              {/* Letter rail */}
              <div className="relative">
                {/* Remove Sticky */}
                <div className="sticky top-20">
                  <span className="text-3xl md:text-4xl font-semibold text-slate-800">
                    {letter}
                  </span>
                </div>
              </div>

              {/* Cards for this letter */}
              <div className="space-y-4 md:space-y-5">
                {list.map((c) => (
                  <article
                    key={c.id}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Avatar with initials */}
                      <div className="h-12 w-12 rounded-full bg-slate-200 grid place-items-center text-slate-600 font-semibold">
                        {initials(c)}
                      </div>

                      {/* Main info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] md:text-base font-medium truncate">
                          {fullName(c)}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500 truncate">
                          {c.position} · {c.company}
                        </p>
                      </div>

                      {/* Actions (hook your overlay later) */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm hover:bg-slate-50"
                          // onClick={() => openOverlay(c.id)}
                        >
                          Information
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm hover:bg-slate-50"
                        >
                          Se Profil
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-[#0A66C2] px-3.5 py-1.5 text-xs md:text-sm font-medium text-white hover:bg-[#004182] transition"
                        >
                          Besøg
                        </button>
                      </div>
                    </div>

                    {/* Optional second row with contact metadata */}
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
                      <a className="hover:underline" href={`mailto:${c.mail}`}>
                        {c.mail}
                      </a>
                      <span>{c.tlf}</span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Divider between groups */}
              <div className="col-span-full my-2 border-b border-slate-200" />
            </section>
          ))}
        </div>
      </main>

      {/* Floating Add Button (visual) */}
      <button
        type="button"
        title="Tilføj kontakt"
        className="fixed right-5 bottom-5 h-14 w-14 rounded-full bg-[#0A66C2] text-white text-3xl leading-[3.5rem] shadow-lg hover:bg-[#004182] transition"
      >
        +
      </button>
    </div>
  );
}
