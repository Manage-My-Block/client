import api from '../utils/axios'


export async function login(data) {
	try {
		const response = await api.post('/login', data)
		return response.data

	} catch (error) {
		return error.response.data
	}
}

export async function register(data) {
	try {
		const response = await api.post('/register', data)
		return response.data

	} catch (error) {
		return error.response.data
	}
}

export async function newBuilding(data) {
	try {

		const response = await api.post('/buildings', data)
		return response.data

	} catch (error) {
		return error.response.data
	}
}

export async function confirmJWT(jwt) {
	try {
		const response = await api.post('/confirmJWT', { jwt })
		return response.data

	} catch (error) {
		return error.response.data
	}
}
