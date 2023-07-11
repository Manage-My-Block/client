import axios from 'axios'

/* Token from seeded admin user just for dev purposes
{
  "username": "john@email.com",
  "password": "password123"
}
*/
const jwt_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMStRVjltY3F2ZFpQK2QxY0h0TExxVTZEaTNVVi92ZkdRSmtzTGlBNGFuY210Y2hYZFkxQ1duVSIsImlhdCI6MTY4ODk1NjkzNywiZXhwIjoxNjg5NTYxNzM3fQ.VAtQEsbZWamQ_vH7eIavmCLRNZYaBj1FKynCKHEbzjw'

// Create an axios instance with custom configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    // headers: {
    // 	common: {
    // 		'Authorization': `Bearer ${jwt_token}`
    // 	}
    // }
})



// // Add request interceptor
// api.interceptors.request.use(
//     (config) => {
//         // Modify request config here if needed
//         return config
//     },
//     (error) => {
//         // Handle request error here
//         return Promise.reject(error)
//     }
// )

// Add response interceptor
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