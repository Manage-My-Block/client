import api from '../utils/axios'

// Get all meetings (async method)
export async function getMeetings(buildingId) {
	const response = await api.get(`/meetings/building/${buildingId}`)
	return response.data
}

// Get single meeting by id (non async method just to see the difference)
export function getMeeting(meetingId) {
	return api.get(`/meetings/${meetingId}`).then(res = res.data)
}

// Create meeting. A meeting is { title, description, meetingDate, zoomLink }
export async function createMeeting(meeting) {
	const response = await api.post('/meetings', meeting)
	return response.data
}

// Update meeting
export async function updateMeeting(meetingId, meeting) {
	const response = await api.put(`/meetings/${meetingId}`, meeting)
	return response.data
}

// Delete meeting
export async function deleteMeeting(meetingId) {
	const response = await api.delete(`/meetings/${meetingId}`)
	return response.data
}

