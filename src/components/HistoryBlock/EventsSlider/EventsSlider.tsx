import cn from 'clsx';
import { gsap } from 'gsap';
import { useEffect, useId, useRef, useState } from 'react';
import type SwiperHTMLElement from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import { animationConstants } from '@/config/constants/animation.constants';
import { desktopBreakpoint } from '@/config/constants/style.constants';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useIsMounted } from '@/hooks/useIsMounted';

import { SliderOpacityOverlay } from '../../ui/Slider/SliderOpacityOverlay/SliderOpacityOverlay';
import { HistoryEvent } from '../type';

import styles from './EventsSlider.module.scss';

interface Props {
	events: HistoryEvent[];
	activeSlide: number;
	title?: string;
	className?: string;
}

export function EventsSlider({ events, activeSlide, title, className }: Props) {
	const {
		eventsSlider: { fadeDur },
		historyCarousel: { rotateDur },
		dateCounter: { countDur },
	} = animationConstants;

	const [oldEvents, setOldEvents] = useState(events);
	const [oldTitle, setOldTitle] = useState(title);
	const [progress, setProgress] = useState(0);

	const eventsSliderRef = useRef<HTMLDivElement>(null);
	const controlledSwiper = useRef<SwiperHTMLElement>(null);

	const nextElId = useId();
	const prevElId = useId();

	const isMounted = useIsMounted();
	const isMobile = useIsMobile();

	useEffect(() => {
		if (controlledSwiper.current) {
			controlledSwiper.current.on('progress', (swiper) => {
				setProgress(swiper.progress);
			});
		}

		return () => {
			if (controlledSwiper.current) {
				controlledSwiper.current.off('progress');
			}
		};
	}, []);

	useEffect(() => {
		const tl = gsap.timeline();

		const fadeAnimation = () => {
			if (!eventsSliderRef.current || !isMounted) {
				return;
			}

			tl.to(eventsSliderRef.current, {
				opacity: 0,
				duration: fadeDur,
			}).set(eventsSliderRef.current, {
				bottom: '-1rem',
				onComplete: () => {
					setOldEvents(events);
					setOldTitle(title);
					if (activeSlide && controlledSwiper.current) {
						controlledSwiper.current.slideTo(0, 0);
					}
				},
			});

			tl.to(eventsSliderRef.current, {
				bottom: 0,
				opacity: 1,
				delay: isMobile ? countDur - fadeDur : rotateDur - fadeDur,
				duration: fadeDur,
			});
		};
		fadeAnimation();

		return () => {
			tl.kill();
		};
	}, [events, isMobile, activeSlide]);

	return (
		<div
			className={cn(styles.eventsSlider, className)}
			ref={eventsSliderRef}
		>
			{oldTitle && <span className={cn(styles.title, 'show-for-mobile-only')}>{oldTitle}</span>}
			<Swiper
				className={`${styles.swiper} fading-swiper`}
				slidesPerView={1.7}
				modules={[Navigation]}
				spaceBetween={25}
				grabCursor={true}
				breakpoints={{
					[desktopBreakpoint]: {
						slidesPerView: 3,
						spaceBetween: 80,
						navigation: {
							nextEl: `#${nextElId}`,
							prevEl: `#${prevElId}`,
							disabledClass: styles['button--hide'],
							hiddenClass: styles['button--hide'],
						},
					},
				}}
				onSwiper={(swiperInstance) => {
					controlledSwiper.current = swiperInstance;
				}}
			>
				{oldEvents.map((event) => (
					<SwiperSlide
						className={styles.slide}
						key={event.id}
					>
						<time
							className={styles.date}
							dateTime={event.year}
						>
							{event.year}
						</time>
						<p className={styles.text}>{event.text}</p>
					</SwiperSlide>
				))}
				{events.length > 1 && (
					<SliderOpacityOverlay
						progress={progress}
						slidesNumber={events.length}
					/>
				)}
			</Swiper>
			<div className={cn(styles.buttons, 'show-for-desktop-only')}>
				<button
					id={prevElId}
					className={cn(styles.button, styles['button--prev'])}
				>
					<span className={styles.arrow} />
				</button>
				<button
					id={nextElId}
					className={cn(styles.button, styles['button--next'])}
				>
					<span className={styles.arrow} />
				</button>
			</div>
		</div>
	);
}
