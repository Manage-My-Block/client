import api from '../utils/axios'

// Get all users (async method)
export async function getUsers() {
	const response = await api.get('/users')
	return response.data
} 

// Get single user by id (non async method just to see the difference)
export function getUser(userId) {
	return api.get(`/users/${userId}`).then(res = res.data)
}

// Create user. A user is { username, password, apartment, name, role(?) }
export async function createUser(user) {
	const response = await api.post('/users', user)
	return response.data
}

// Update user
export async function updateUser(userId, user) {
	const response = await api.put(`/users/${userId}`, user)
	return response.data
}

// Delete user
export async function deleteUser(userId) {
	const response = await api.delete(`/users/${userId}`)
	return response.data
}

