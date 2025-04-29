export function formatNumber(num: number, padStart = 2) {
	return num.toString().padStart(padStart, '0');
}
