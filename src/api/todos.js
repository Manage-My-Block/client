import api from '../utils/axios'

// Get all todos (async method)
export async function getTodos() {
	const response = await api.get('/todos')
	return response.data
} 

// Get single todo by id (non async method just to see the difference)
export function getTodo(todoId) {
	return api.get(`/todos/${todoId}`).then(res = res.data)
}

// Create todo. A todo is { title, description, dueDate }
export async function createTodo(todo) {
	const response = await api.post('/todos', todo)
	return response.data
}

// Update todo
export async function updateTodo(todoId, todo) {
	const response = await api.put(`/todos/${todoId}`, todo)
	return response.data
}

// Delete todo
export async function deleteTodo(todoId) {
	const response = await api.delete(`/todos/${todoId}`)
	return response.data
}

