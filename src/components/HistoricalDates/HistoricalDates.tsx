import cn from 'clsx';

import slides from '@/config/slides.json';

import { Heading } from '../ui/heading/Heading';

import { CarouselControls } from './CarouselControls/CarouselControls';
import { EventsSliderIsolated } from './EventsSlider/EventsSliderIsolated';
import { HistoryPeriod } from './HistoryPeriod/HistoryPeriod';

import styles from './HistoricalDates.module.scss';

export function HistoricalDates() {
	return (
		<section className={styles.historicalDates}>
			<Heading className={styles.heading}>{'Исторические\nдаты'}</Heading>
			<HistoryPeriod
				className={styles.historyPeriod}
				slides={slides}
			/>
			{slides.length > 1 && (
				<CarouselControls
					className={cn(styles.carouselControls, 'show-for-desktop-only')}
					slidesCount={slides.length}
				/>
			)}
			<EventsSliderIsolated slides={slides} />
			<CarouselControls
				className={cn(styles.carouselControls, 'show-for-mobile-only')}
				slidesCount={slides.length}
			/>
		</section>
	);
}
