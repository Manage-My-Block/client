export default function MemberItem({ member }) {
    return (
        <tr className="">
            <td>{member.name}</td>
            <td>{member.apartment}</td>
            <td>{member.email}</td>
        </tr>
    )
}
