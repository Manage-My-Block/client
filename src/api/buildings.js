import api from '../utils/axios'


export async function getBuildings() {
	console.log('Getting buildings')
	console.log(api.getUri() + '/buildings')

	try {
		const response = await api.get('/buildings')

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function getBuilding(buildingId) {
	try {
		const response = await api.get(`/buildings/${buildingId}`)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function updateBuilding(data) {
	try {
		const response = await api.put(`/buildings/${data.buildingId}`, data.buildingData)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}


export async function newBuilding({ data }) {
	console.log('Creating new building')

	try {

		const response = await api.post('/newbuilding', { data })
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}