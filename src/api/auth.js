import api from '../utils/axios'


export async function login({ email, password }) {
	console.log('Logging in')

	try {
		const response = await api.post('/login', { email, password })
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function register({ email, password, apartment, name }) {
	console.log('Registering')

	try {
		const response = await api.post('/register', { email, password, apartment, name })
		return response.data
	} catch (error) {
		console.log(error.message)
	}
}

export async function newBuilding({ data }) {
	console.log('Creating new building')

	try {

		const response = await api.post('/newbuilding', { data })
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function confirmJWT(jwt) {
	console.log('Confirming JWT in storage is valid in')

	try {
		const response = await api.post('/confirmJWT', { jwt })
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}
