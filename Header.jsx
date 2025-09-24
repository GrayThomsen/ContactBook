export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-[6px] bg-[#0A66C2] text-white grid place-items-center font-bold">
            in
          </div>
          <span className="text-xl font-semibold">Contact</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <span className="hover:text-slate-900 cursor-pointer">Startside</span>
          <span className="hover:text-slate-900 cursor-pointer">
            Dit netværk
          </span>
          <span className="hover:text-slate-900 cursor-pointer">Job</span>
          <span className="hover:text-slate-900 cursor-pointer">Beskeder</span>
          <span className="hover:text-slate-900 cursor-pointer">
            Notifikationer
          </span>
        </nav>
      </div>
    </header>
  );
}
