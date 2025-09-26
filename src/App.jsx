import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import Header from "../Header";
import Search from "../Search";
import Button from "../Button";

import "./App.css";
import { contacts as seed } from "./data/contactdata";
import { useState } from "react";
import ContactList from "../ContactList";
import AddContactModal from "../AddContactModal";
import InfoModal from "../InfoModal";

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState(seed);

  const [infoOpen, setInfoOpen] = useState(false);
  const [infoContact, setInfoContact] = useState(null);
  // filter contacts by query
  const filtered = contacts.filter((c) =>
    `${c.firstname} ${c.lastname} ${c.company} ${c.position}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // function to add a new contact
  const addContact = (data) => {
    const nextId = Math.max(...contacts.map((c) => c.id)) + 1; // simple unique id
    setContacts([...contacts, { id: nextId, ...data }]);
    setOpen(false);
  };

  function handleShowInfo(contact) {
    setInfoContact(contact);
    setInfoOpen(true);
  }
  return (
    <div className="min-h-screen bg-[#F3F2EF] text-slate-900">
      {/* Top Bar | Statisk */}
      <Header />
      {/* Search Function*/}
      <Search query={query} setQuery={setQuery} />
      {/* Grouped contact list */}
      <ContactList seed={contacts} query={query} onInfo={handleShowInfo} />
      {/* Floating Add Button */}
      <Button onClick={() => setOpen(true)} /> {/* open modal */}
      <AddContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={addContact}
      />
      <InfoModal
        open={infoOpen}
        contact={infoContact}
        onClose={() => setInfoOpen(false)}
      />
    </div>
  );
}
