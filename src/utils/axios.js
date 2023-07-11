import axios from 'axios'

/* Token from seeded admin user just for dev purposes
{
  "username": "john@email.com",
  "password": "password123"
}
*/
const jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMStRVjltY3F2ZFpQK2QxY0h0TExxVTZEaTNVVi92ZkdRSmtzTGlBNGFuY210Y2hYZFkxQ1duVSIsImlhdCI6MTY4ODk1NjkzNywiZXhwIjoxNjg5NTYxNzM3fQ.VAtQEsbZWamQ_vH7eIavmCLRNZYaBj1FKynCKHEbzjw"


// Create an axios instance with custom configuration
export default axios.create({
	baseURL: 'http://127.0.0.1:3001',
	// headers: {
	// 	common: {
	// 		'Authorization': `Bearer ${jwt_token}`
	// 	}
	// }
})