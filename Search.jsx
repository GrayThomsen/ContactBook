export default function Search({query, setQuery}){
return (
<div className="mx-auto max-w-2xl px-4 py-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søg"
          className="w-full rounded-full border border-slate-300 bg-white px-5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />
      </div>
      )
      }