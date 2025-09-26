import { useMemo } from "react";

const fullName = (c) => `${c.firstname} ${c.lastname}`.trim();
const initials = (c) =>
  fullName(c)
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function ContactList({ query, seed, onInfo }) {
  // Filter + group by first letter of full name
  const grouped = useMemo(
    () => {
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
    },
    // Without the seed dependency, the component didn't change with the new additions made by "AddContactModal.jsx"
    [query, seed]
  );
  return (
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
              {/* Maybe Remove Sticky? */}
              <div className="sticky top-20">
                <span className="text-3xl md:text-4xl font-semibold text-slate-800">
                  {letter}
                </span>
              </div>
            </div>

            {/* Cards for specific letter */}
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

                    {/* Card info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] md:text-base font-medium truncate">
                        {fullName(c)}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 truncate">
                        {c.position} · {c.company}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onInfo(c)}
                        className="hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm hover:bg-slate-50"
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
                </article>
              ))}
            </div>

            {/* Divider between groups */}
            <div className="col-span-full my-2 border-b border-slate-200" />
          </section>
        ))}
      </div>
    </main>
  );
}
