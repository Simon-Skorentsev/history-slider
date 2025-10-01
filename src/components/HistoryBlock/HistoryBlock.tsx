import cn from 'clsx';
import { useState } from 'react';

import slides from '@/config/constants/slides.json';

import { SliderControls } from '../ui/Slider/SliderControls/SliderControls';
import { Title } from '../ui/Title/Title';

import { EventsSlider } from './EventsSlider/EventsSlider';
import { HistorySlider } from './HistorySlider/HistorySlider';

import styles from './HistoryBlock.module.scss';

export function HistoryBlock() {
	const [activeSlide, setActiveSlide] = useState(0);

	const isShowControls = slides.length > 1;

	const onPrevButtonClick = () => {
		setActiveSlide((oldValue) => oldValue - 1);
	};

	const onNextButtonClick = () => {
		setActiveSlide((oldValue) => oldValue + 1);
	};

	const onPaginationClick = (paginationDotIndex: number) => {
		setActiveSlide(paginationDotIndex);
	};

	return (
		<section className={styles.historyBlock}>
			<Title className={styles.title}>{'Исторические\nдаты'}</Title>
			<HistorySlider
				className={cn(styles.historySlider, {
					[styles['historySlider--no-controls']]: !isShowControls,
				})}
				slides={slides}
				activeSlide={activeSlide}
				setActiveSlide={setActiveSlide}
			/>
			{isShowControls && (
				<SliderControls
					className={cn(styles.sliderControls, 'show-for-desktop-only')}
					slidesCount={slides.length}
					activeSlide={activeSlide}
					onNextButtonClick={onNextButtonClick}
					onPrevButtonClick={onPrevButtonClick}
					onPaginationClick={onPaginationClick}
				/>
			)}
			<EventsSlider
				className={styles.eventsSlider}
				events={slides[activeSlide].events}
				title={slides[activeSlide].title}
				activeSlide={activeSlide}
			/>
			{isShowControls && (
				<SliderControls
					className={cn(styles.sliderControls, 'show-for-mobile-only')}
					slidesCount={slides.length}
					activeSlide={activeSlide}
					onNextButtonClick={onNextButtonClick}
					onPrevButtonClick={onPrevButtonClick}
					onPaginationClick={onPaginationClick}
				/>
			)}
		</section>
	);
}
