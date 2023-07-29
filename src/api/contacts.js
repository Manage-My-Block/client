import api from '../utils/axios'


export async function getContacts() {
	// console.log('Getting contacts')

	try {
		const response = await api.get('/contacts')

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function getContact(contactId) {
	try {
		const response = await api.get(`/contacts/${contactId}`)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function updateContact(data) {
	try {
		const response = await api.put(`/contacts/${data.contactId}`, data.contactData)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function createContact(data) {
	try {

		const response = await api.post('/contacts', data)
		return response.data

	} catch (error) {
		console.log(error.message)
	}
}

export async function deleteContact(data) {
	console.log('Deleting a Contact')

	try {
		const response = await api.delete(`/contacts/${data}`,)

		return response.data

	} catch (error) {
		console.log(error.message)
	}
}