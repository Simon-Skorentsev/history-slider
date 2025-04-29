export interface HistoricalEvent {
	id: string;
	year: string;
	text: string;
}

export interface Slide {
	id: string,
	title: string,
	from: string,
	to: string,
	events: HistoricalEvent[],
}
