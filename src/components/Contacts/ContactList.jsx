import ContactItem from "./ContactItem"

export default function ContactList({ contacts }) {
    return <div>
        <table className="table table-zebra text-lg">
            <thead className="text-lg">
                <tr>
                    <th>Occupation</th>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <ContactItem key={contact._id} contact={contact} />
                ))}
            </tbody>
        </table>
    </div>
}
