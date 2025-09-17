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
      <ContactList contacts={contacts} />
      <Welcome name="John" message="Du har syv ulæste beskeder" />
      {[0, 1, 2, 3].map((index) => (
        <Button key={index} color={"#402050"} size={"3rem"} title={"Test"} />
      ))}
    </>
  );
}

export default App;
