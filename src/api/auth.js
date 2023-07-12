import api from '../utils/axios'

export async function login({ email, password }) {
	console.log('Logging in')

	try {
		const response = await api.post('/login', { email, password })
		return response.data
	
	} catch (error) {
		
	}
}

export async function register({ email, password, apartment, name }) {
	// console.log('Registering')

	try {
		const response = await api.post('/register', { email, password, apartment, name })
		return response.data
	} catch (error) {
		
	}
} 
