export function convertDateString(dateString) {
	const dateObj = new Date(dateString)
	// console.log(dateObj)

	let newDateString = dateObj.toLocaleDateString('en-AU')
	// console.log(newDateString)

	return newDateString
}