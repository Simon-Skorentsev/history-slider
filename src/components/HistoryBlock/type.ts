export interface HistoryEvent {
	id: string;
	year: string;
	text: string;
}

export interface Slide {
	id: string;
	title: string;
	from: string;
	to: string;
	events: HistoryEvent[];
}
