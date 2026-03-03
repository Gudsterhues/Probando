type Contact = {
  id: number;
  name: string;
  phone: string;
};

type Props = {
  contacts: Contact[];
  onDeleteContact: (id: number) => void;
};

function ListaContactos({ contacts, onDeleteContact }: Props) {
  return (
    <>
      <h2>Contacts</h2>

      {contacts.map((item) => {
        return (
          <li key={item.id}>
            {item.name} - {item.phone}
            <button onClick={() => onDeleteContact(item.id)}>Delete</button>
          </li>
        );
      })}
    </>
  );
}

export default ListaContactos;