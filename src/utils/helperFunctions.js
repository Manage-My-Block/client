import jwt_decode from 'jwt-decode';

export function convertDateString(dateString) {
	const dateObj = new Date(dateString)
	// console.log(dateObj)

	let newDateString = dateObj.toLocaleDateString('en-AU')
	// console.log(newDateString)

	return newDateString
}

export function isTokenExpired(token) {
	if (token) {
		const decodedToken = jwt_decode(token);
		const currentTime = Date.now() / 1000; // Convert to seconds

		return decodedToken.exp < currentTime;
	}

	return true; // Token is considered expired if not provided
}