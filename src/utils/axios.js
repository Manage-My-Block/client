import axios from 'axios'

/* Token from seeded admin user just for dev purposes
{
  "username": "john@email.com",
  "password": "password123"
}
*/
const jwt_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMS9OazVYSGN3WGlmd3pQLytIV0xVNHlLT0E3K2R2M3NpT1doM1N5QmV4aU92RWJCSUtzRDIwVSIsImlhdCI6MTY4OTA3MjQzOSwiZXhwIjoxNjg5Njc3MjM5fQ.j4Lx2ZxY8iZ-gNByRHSzs_IalAdBByCAKzfFf-UADBc'

// Create an axios instance with custom configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    headers: {
    	common: {
    		'Authorization': `Bearer ${jwt_token}`
    	}
    }
})


// Add request interceptor (used here to add the JWT from localStorage to all outgoing requests)
api.interceptors.request.use(
    (config) => {
		// Extract JWT token from localStorage
		const localStorageUser = JSON.parse(localStorage.getItem('user-storage'))
		const token = localStorageUser.state.token
		
		// Add the JWT to the axios instance
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		  }
        // Modify request config here if needed
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
            // console.log('Headers:', error.response.headers)
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