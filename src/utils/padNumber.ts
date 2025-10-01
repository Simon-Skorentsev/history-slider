export function padNumber(num: number, padStart = 2) {
	return num.toString().padStart(padStart, '0');
}
