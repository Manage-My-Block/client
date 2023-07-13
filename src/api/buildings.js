import api from '../utils/axios'


export async function getBuildings() {
	console.log('Getting buildings')

	try {
		const response = await api.get('/buildings')
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