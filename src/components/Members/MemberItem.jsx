export default function MemberItem({ member }) {
    return (
        <tr>
            <td>{member.name}</td>
            <td>{member.apartment}</td>
            <td>{member.email}</td>
        </tr>
    )
}
