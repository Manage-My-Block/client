import { useAuthStore } from "../stores/AuthStore"

export default function UserDebug() {
	const { email, apartment, name, token } = useAuthStore()
	
    return <div className="px-2 py-1 fixed bottom-0 right-0 bg-emerald-500/10 rounded">
		<h2 className="font-bold">Logged In User Debug Info</h2>
		<p>Email: {email}</p>
		<p>Apartment: {apartment}</p>
		<p>Name: {name}</p>
		{token && <p>Token: {'......' + token.slice(-4)}</p>}
	</div>
}
