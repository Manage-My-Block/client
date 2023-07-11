import { useAuthStore } from "../stores/AuthStore"

export default function UserDebug() {
	const { username, apartment, name, token } = useAuthStore()
	
    return <div className="p-2 fixed bottom-0 right-0 bg-red-200/20 rounded">
		<h2 className="font-bold">Logged In User Info</h2>
		<p>Username: {username}</p>
		<p>Apartment: {apartment}</p>
		<p>Name: {name}</p>
		{/* <p>Token: {token}</p> */}
	</div>
}
