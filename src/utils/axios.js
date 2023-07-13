import axios from 'axios'
import { useAuthStore } from '../stores/AuthStore';

// Create an axios instance with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:3001',
})

// Add request interceptor (used here to add the JWT from localStorage to all outgoing requests)
api.interceptors.request.use(
    (config) => {
        // Extract JWT token from localStorage
        const token = useAuthStore.getState().token

        // Add token to header
        config.headers = { Authorization: `Bearer ${token}` }

        return config
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error)
    }
)

// Add response interceptor (used here to add global error handling)
api.interceptors.response.use(
    (response) => {
        // Handle successful response here
        return response
    },
    (error) => {
        // Handle response error here
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log('Response Error:', error.response.data)
            console.log('Status Code:', error.response.status)
        } else if (error.request) {
            // The request was made but no response was received
            console.log('Request Error:', error.request)
        } else {
            // Something happened in setting up the request
            console.log('Error:', error.message)
        }

        return Promise.reject(error)
    }
)

export default api