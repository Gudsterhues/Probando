import { useState } from "react";

type Props = {
  onAddContact: (name: string, phone: string) => void;
};

function Contactos({ onAddContact }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = () => {
    if (name.trim() === "" || phone.trim() === "") return;

    onAddContact(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <>
      <h2>Add Contact</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Contactos;