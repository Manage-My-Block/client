import axios from '../utils/axios'

export async function login({ email, password }) {
	// console.log('Logging in')

	try {
		const response = await axios.post('/login', { username: email, password })
		return response.data
	} catch (error) {
		console.log(error)
		console.error(error.response.data.error)
	}
}

export async function register({ email, password, apartment, name }) {
	// console.log('Registering')

	try {
		const response = await axios.post('/register', { email, password, apartment, name })
		return response.data
	} catch (error) {
		console.log(error)
		console.error(error.response.data.errors)
	}
} 
