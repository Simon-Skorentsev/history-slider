import { useActiveSlideContext } from '@/hooks/useActiveSlideContext';

import { Slide } from '../type';

import { EventsSlider } from './EventsSlider';

interface Props {
	slides: Slide[];
}

export function EventsSliderIsolated({ slides }: Props) {
	const activeSlide = useActiveSlideContext();

	return (
		<EventsSlider
			events={slides[activeSlide].events}
			title={slides[activeSlide].title}
			subscribeResetVar={activeSlide}
		/>
	);
}
