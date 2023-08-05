import api from '../utils/axios'

// Get all users
export async function getUsers(buildingId) {
	const response = await api.get(`/users/building/${buildingId}`)
	return response.data
}

// Get single user by id (non async method just to see the difference)
export async function getUser(userId) {
	const response = await api.get(`/users/${userId}`)
	return response.data
}

// Create user. A user is { username, password, apartment, name, role(?) }
export async function createUser(user) {
	const response = await api.post('/users', user)
	return response.data
}

// Update user
export async function updateUser(data) {
	const response = await api.put(`/users/${data.userId}`, data.user)
	return response.data
}

// Delete user
export async function deleteUser(userId) {
	const response = await api.delete(`/users/${userId}`)
	return response.data
}

