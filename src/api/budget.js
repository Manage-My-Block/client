import api from '../utils/axios'


export async function getBudgets() {

	try {
		const response = await api.get('/budgets')

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function createBudget({ data }) {

	try {

		const response = await api.post('/budgets', { data })
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}