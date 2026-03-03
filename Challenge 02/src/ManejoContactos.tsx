import { useEffect, useState } from "react";
import Loader from "./loader";
import Contactos from "./contactos";
import ListaContactos from "./ListaContactos";

type Contact = {
  id: number;
  name: string;
  phone: string;
};

const initialContacts: Contact[] = [
  { id: 1, name: "Camilo", phone: "12354268" },
  { id: 2, name: "Manuel", phone: "3001234567" },
];

function ManejoContactos() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 1200);
  }, []);

  const onAddContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name: name,
      phone: phone,
    };

    setContacts([...contacts, newContact]);
  };

  const onDeleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <>
      <h1>Challenge 02</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Contactos onAddContact={onAddContact} />
          <hr />
          <ListaContactos contacts={contacts} onDeleteContact={onDeleteContact} />
        </>
      )}
    </>
  );
}

export default ManejoContactos;