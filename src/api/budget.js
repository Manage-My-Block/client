import api from '../utils/axios'


export async function getBudgets() {

	try {
		const response = await api.get('/budgets')

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function getBudgetById(budgetId) {

	try {
		const response = await api.get(`/budgets/${budgetId}`)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function getBudgetByBuildingId(buildingId) {
	try {
		const response = await api.get(`/budgets/building/${buildingId}`)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function createBudget(newBudget) {

	try {

		const response = await api.post('/budgets', newBudget)
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function upateBudget(data) {

	try {
		const response = await api.put(`/budgets/${data.budgetId}`, data.updatedBudgetData)
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function removeTransaction(data) {

	try {

		const response = await api.patch(`/budgets/${data.budgetId}/${data.todoId}`)
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function deleteBudget(budgetId) {
	try {
		const response = await api.delete(`/budgets/${budgetId}`)
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}