import axios from './axios'

// Get all todos (async method)
export async function getTodos() {
	const response = await axios.get('/todos')
	return response.data
} 

// Get single todo by id (non async method just to see the difference)
export function getTodo(todoId) {
	return axios.get(`/todos/${todoId}`).then(res = res.data)
}

// Create todo (todo is { title, description, dueDate, authorId })
export async function createTodo(todo) {
	const response = await axios.post('/todos', todo)
	return response.data
}

// Update todo
export async function updateTodo(todoId, todo) {
	const response = await axios.put(`/todos/${todoId}`, todo)
	return response.data
}

// Delete todo
export async function deleteTodo(todoId) {
	const response = await axios.delete(`/todos/${todoId}`)
	return response.data
}

