import { useState, useEffect, useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

import { supabase } from "./supabaseClient";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [user, setUser] = useState(null);

  const modalRef = useRef(null);

  // check if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  // close on escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // close on click outside
  function handleOverlayClick(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  }

  function handleLogout() {
    supabase.auth.signOut();
    setUser(null);
  }

  return (
    <>
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
            <span className="hover:text-slate-900 cursor-pointer">Dit netværk</span>
            <span className="hover:text-slate-900 cursor-pointer">Job</span>
            <span className="hover:text-slate-900 cursor-pointer">Beskeder</span>
            <span className="hover:text-slate-900 cursor-pointer">Notifikationer</span>
            {!user ? (
              <button
                onClick={() => {
                  setMode("login");
                  setOpen(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Log In
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-medium">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Log out
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            {mode === "login" ? (
              <>
                <Login
                  onLogin={(u) => {
                    setUser(u);
                    setOpen(false);
                  }}
                />
                <p className="text-center mt-4 text-sm">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setMode("signup")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <SignUp />
                <p className="text-center mt-4 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => setMode("login")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Log in
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
