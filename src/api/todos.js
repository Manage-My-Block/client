import api from '../utils/axios'

// Get all todos (async method)
export async function getTodos() {
	const response = await api.get('/todos')
	return response.data
}

// Get single todo by id (non async method just to see the difference)
export function getTodo(todoId) {
	return api.get(`/todos/${todoId}`).then(res => res.data)
}

// Create todo. A todo is { title, description, dueDate }
export async function createTodo(todo) {
	const response = await api.post('/todos', todo)
	return response.data
}

// Update todo
export async function updateTodo(data) {
	const response = await api.put(`/todos/${data.todoId}`, data.updatedData)
	return response.data
}

// Cast vote
export async function voteOnTodo(data) {
	const response = await api.put(`/todos/${data.todoId}/vote`, data.vote)
	return response.data
}

// Call vote
export async function callVoteTodo(data) {
	const response = await api.put(`/todos/${data}/callvote`)
	return response.data
}

// Write comment
export async function commentTodo(data) {
	const response = await api.put(`/todos/${data.todoId}/comment`, data.comment)
	return response.data
}

// Delete todo
export async function deleteTodo(todoId) {
	const response = await api.delete(`/todos/${todoId}`)
	return response.data
}

