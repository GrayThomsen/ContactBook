import Header from "../Header";
import Search from "../Search";
import Button from "../Button";
import SignUp from "../SignUp";

import "./App.css";
import { useEffect, useState } from "react";
import ContactList from "../ContactList";
import AddContactModal from "../AddContactModal";
import InfoModal from "../InfoModal";
import { getContacts, addContact } from "../api";

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoContact, setInfoContact] = useState(null);
  const [error, setError] = useState("");

  // Load once
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getContacts();
        setContacts(data);
      } catch (e) {
        console.error(e);
        setError("Kunne ikke hente kontakter fra databasen.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter contacts by query (kept for ContactList prop compatibility)
  const filtered = contacts.filter((c) =>
    `${c.firstname ?? ""} ${c.lastname ?? ""} ${c.company ?? ""} ${c.position ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Submit handler for AddContactModal -> POST to Supabase, update state, close modal
  const handleAddContact = async (formData) => {
    try {
      const created = await addContact(formData);
      setContacts((prev) => [...prev, created]); // append the returned row
      setOpen(false);
    } catch (e) {
      console.error(e);
      setError("Kunne ikke tilføje kontakten. Tjek felter/RLS policies.");
    }
  };

  function handleShowInfo(contact) {
    setInfoContact(contact);
    setInfoOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF] text-slate-900">
      {/* Top Bar | Statisk */}
      <Header />

      {/* Optional feedback */}
      {error && (
        <div className="mx-auto mt-3 max-w-3xl rounded-md bg-red-100 px-4 py-2 text-sm text-red-900">
          {error}
        </div>
      )}

      {/* Search */}
      <Search query={query} setQuery={setQuery} />

      {/* Contact list */}
      {loading ? (
        <div className="mx-auto mt-10 max-w-3xl animate-pulse text-center text-slate-600">
          Indlæser kontakter…
        </div>
      ) : (
        <ContactList seed={filtered} query={query} onInfo={handleShowInfo} />
      )}

      {/* Floating Add Button */}
      <Button onClick={() => setOpen(true)} />

      {/* Modals */}
      <AddContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddContact}
      />
      <InfoModal
        open={infoOpen}
        contact={infoContact}
        onClose={() => setInfoOpen(false)}
      />
    </div>
  );
}
