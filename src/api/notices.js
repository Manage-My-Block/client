import api from '../utils/axios'

// Get all notices (async method)
export async function getNotices() {
	const response = await api.get('/notices')
	return response.data
}

// Get single notice by id (non async method just to see the difference)
export function getNotice(noticeId) {
	return api.get(`/notices/${noticeId}`).then(res => res.data)
}

// Create notice. A notice is { title, message, imageUrl(optional) }
export async function createNotice(notice) {
	const response = await api.post('/notices', notice)
	return response.data
}

// Update notice
export async function updateNotice(noticeId, notice) {
	const response = await api.put(`/notices/${noticeId}`, notice)
	return response.data
}

// Update notice with a comment
export async function addCommentNotice(noticeId, comment) {
	const response = await api.patch(`/notices/${noticeId}`, comment)
	return response.data
}

// Delete a comment from a notice
export async function deleteCommentNotice(noticeId, commentId) {
	const response = await api.delete(`/notices/${noticeId}/${commentId}`)
	return response.data
}

// Delete notice
export async function deleteNotice(noticeId) {
	const response = await api.delete(`/notices/${noticeId}`)
	return response.data
}

