import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Welcome from "../welcome";
import { Button } from "../welcome";
import ContactList from "../contacts";
import { contacts } from "./data/contactdata";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FontAwesomeIcon icon={faHouse} />
      <ContactList contacts={contacts} />
      <Welcome name="John" message="Du har syv ulæste beskeder" />
    </>
  );
}

export default App;
