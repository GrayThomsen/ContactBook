import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import Header from "../Header";
import Search from "../Search";
import Button from "../Button";

import "./App.css";
import { contacts as seed } from "./data/contactdata";
import { useState } from "react";
import ContactList from "../ContactList";
import Button from "../Button";

export default function App() {
  const [query, setQuery] = useState("");

 

  return (
    <div className="min-h-screen bg-[#F3F2EF] text-slate-900">
      {/* Top Bar | Statisk */}
      <Header />

      {/* Search Function*/}
      <Search query={query} setQuery={setQuery} />

      {/* Grouped contact list */}
      <ContactList seed={seed} query={query} />

      {/* Floating Add Button (visual) */}
      <Button />
    </div>
  );
}
