import jwt_decode from 'jwt-decode';
import { formatDistanceToNow, format, formatRelative, parseISO } from 'date-fns'

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

// Converts a date string to a natural language 'distance since date' (eg: "14 minutes ago")
export function convertToNaturalLanguage(dateString) {
	const date = new Date(dateString);
	const distance = formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
	return distance;
}

// Converts a date string to 'yyyy-MM-dd'
export function convertDateInput(dateString) {
	const cleanedDateString = format(new Date(dateString), 'yyyy-MM-dd')
	return cleanedDateString;
}

// Converts a date string to 'yyyy-MM-dd'
export function cleanDateString(dateString) {
	const cleanedDateString = formatRelative(parseISO(dateString), new Date())
	return cleanedDateString;
}

export function shortenText(string, maxLength = 15) {
	return string.length > maxLength ? string.slice(0, maxLength) + "..." : string

}