import { useAuthUser } from 'react-auth-kit'

export default function UserDebug() {
	const auth = useAuthUser()
	const user = auth()?.user

	return <div className="px-4 py-2 fixed bottom-0 right-0 bg-emerald-500/10 rounded">
		<h2 className="font-bold underline">Logged In User Debug Info</h2>
		{user && Object.entries(user).map((value, index) => {
			let field
			if (value[0] === "role") {
				field = value[1].role
			} else if (value[0] === "building") {
				field = value[1].name
			} else {
				field = value[1]
			}
			return <p key={index}>{value[0]}: {field}</p>
		})}
	</div>
}
