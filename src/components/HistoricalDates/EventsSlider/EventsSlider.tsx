import cn from 'clsx';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import type SwiperHTMLElement from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import { animationsConfig } from '@/config/animations';

import { useIsMobile } from '@/hooks/useIsMobile';

import { HistoricalEvent } from '../type';

import { OpacityOverlay } from './OpacityOverlay/OpacityOverlay';

import styles from './EventsSlider.module.scss';

interface Props {
	events: HistoricalEvent[];
	title?: string;
	subscribeResetVar?: unknown;
}

export function EventsSlider({ events, title, subscribeResetVar }: Props) {
	const {
		eventsSlider: { fadeDur: fadeDur },
		circularCarousel: { rotateDur },
		dateCounter: { countDur },
	} = animationsConfig;

	const [isMounted, setIsMounted] = useState(false);
	const [oldEvents, setOldEvents] = useState(events);
	const [oldTitle, setOldTitle] = useState(title);
	const [progress, setProgress] = useState(0);

	const eventsSliderRef = useRef<HTMLDivElement>(null);
	const controlledSwiper = useRef<SwiperHTMLElement>(null);

	const isMobile = useIsMobile();

	useEffect(() => {
		setIsMounted(true);

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
					if (subscribeResetVar !== undefined && controlledSwiper.current) {
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
	}, [events, isMobile, subscribeResetVar]);

	return (
		<div
			className={styles.eventsSlider}
			ref={eventsSliderRef}
		>
			{oldTitle && <span className={cn(styles.title, 'show-for-mobile-only')}>{oldTitle}</span>}
			<Swiper
				className={`${styles.swiper} fading-swiper`}
				slidesPerView={1.6}
				modules={[Navigation]}
				spaceBetween={25}
				grabCursor={true}
				breakpoints={{
					1000: {
						slidesPerView: 3,
						spaceBetween: 80,
						navigation: {
							nextEl: `.${styles['button--next']}`,
							prevEl: `.${styles['button--prev']}`,
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
					<OpacityOverlay
						progress={progress}
						eventsLength={events.length}
					/>
				)}
			</Swiper>
			<div className={cn(styles.buttons, 'show-for-desktop-only')}>
				<button className={cn(styles.button, styles['button--prev'])}>
					<span className={styles.arrow} />
				</button>
				<button className={cn(styles.button, styles['button--next'])}>
					<span className={styles.arrow} />
				</button>
			</div>
		</div>
	);
}
