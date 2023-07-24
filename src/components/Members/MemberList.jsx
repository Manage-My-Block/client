import MemberItem from "./MemberItem"

export default function MemberList({ members }) {
    return <div>
        <table className="table table-zebra text-lg">
            <thead className="text-lg">
                <tr>
                    <th>Name</th>
                    <th>Apartment</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member, index) => (
                    <MemberItem key={member._id} member={member} />
                ))}
            </tbody>
        </table>
    </div>
}
