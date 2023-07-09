import axios from 'axios'

// Create an axios instance with custom configuration
export default axios.create({
	baseURL: 'http://127.0.0.1:5000' 
})