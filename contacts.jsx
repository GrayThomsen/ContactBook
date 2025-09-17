export default function ContactList({ contacts }) {
  return (
    <>
      {contacts.map((person) => (
        <div key={person.id}>
          <p>
            <span>{person.firstname} </span>
            <span>{person.lastname}</span>
          </p>
        </div>
      ))}
    </>
  );
}
