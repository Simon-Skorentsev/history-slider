import cn from 'clsx';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import { animationConstants } from '@/config/constants/animation.constants';

import { degreesToRadians } from '@/utils/degreesToRadians';

import { Slide } from '../../type';

import { HistoryCarouselItem, HistoryCarouselItemRefs } from './HistoryCarouselItem/HistoryCarouselItem';

import styles from './HistoryCarousel.module.scss';

interface Props {
	slides: Slide[];
	activeSlide: number;
	setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
	direction?: 'counterclockwise' | 'clockwise';
}

export const HistoryCarousel = ({ slides, activeSlide, setActiveSlide, direction = 'clockwise' }: Props) => {
	const radius = 265;
	const angle = 360 / slides.length;
	const rotationDirectionCoefficient = direction === 'counterclockwise' ? 1 : -1;
	const {
		historyCarousel: { rotateDur, titleDur },
	} = animationConstants;

	const historyCarouselRef = useRef<HTMLDivElement>(null);
	const carouselItems = useRef<HistoryCarouselItemRefs[]>([]);
	const oldActiveIndex = useRef<number | null>(null);

	// Инициализация начальных позиций элементов
	useEffect(() => {
		slides.forEach((_, slideIndex) => {
			const carouselItem = carouselItems.current[slideIndex];

			if (!carouselItem || !carouselItem.itemElement) {
				return;
			}

			const angelStepMultiplier = slideIndex - 1;
			const left = radius + radius * Math.cos(angelStepMultiplier * degreesToRadians(angle));
			const top = radius + radius * Math.sin(angelStepMultiplier * degreesToRadians(angle));

			gsap.set(carouselItem.itemElement, {
				left: `${left / 16}rem`,
				top: `${top / 16}rem`,
			});
		});
	}, [slides, angle]);

	// Эффект для анимации вращения
	useEffect(() => {
		const tl = gsap.timeline();

		const rotateAnimation = () => {
			if (!historyCarouselRef.current) return;

			// Вращение карусели
			tl.to(historyCarouselRef.current, {
				rotation: angle * activeSlide * rotationDirectionCoefficient,
				duration: rotateDur,
				ease: 'power2.inOut',
			});

			// Вращение элементов
			slides.forEach((_, index) => {
				const carouselItem = carouselItems.current[index];

				if (!carouselItem || !carouselItem.itemElement) {
					return;
				}

				tl.to(
					carouselItem.itemElement,
					{
						rotation: angle * activeSlide * -rotationDirectionCoefficient,
						duration: rotateDur,
						ease: 'power2.inOut',
					},
					'<',
				);
			});
		};
		rotateAnimation();

		return () => {
			tl.kill();
		};
	}, [activeSlide, slides]);

	// Эффект для анимации заголовков
	useEffect(() => {
		const tl = gsap.timeline();
		const activeCarouselItem = carouselItems.current[activeSlide];

		const titleAnimation = () => {
			if (oldActiveIndex.current === null) {
				tl.fromTo(
					activeCarouselItem.titleElement,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: titleDur,
					},
				);

				return;
			}

			const prevActiveCarouselItem = carouselItems.current[oldActiveIndex.current];
			if (prevActiveCarouselItem && prevActiveCarouselItem.titleElement) {
				tl.to(prevActiveCarouselItem.titleElement, {
					opacity: 0,
					duration: titleDur,
				});
			}

			if (activeCarouselItem && activeCarouselItem.titleElement) {
				tl.to(
					activeCarouselItem.titleElement,
					{
						opacity: 1,
						duration: titleDur,
					},
					`>${rotateDur - titleDur}`,
				);
			}
		};
		titleAnimation();

		return () => {
			tl.kill();
		};
	}, [activeSlide, slides, angle]);

	const changeActiveSlide = (index: number) => {
		oldActiveIndex.current = activeSlide;
		setActiveSlide(index);
	};

	return (
		<div
			className={cn(styles.historyCarousel, 'show-for-desktop-only')}
			ref={historyCarouselRef}
		>
			{slides.map((slide, index) => (
				<HistoryCarouselItem
					key={slide.id}
					title={slide.title}
					text={`${index + 1}`}
					isActive={activeSlide === index}
					onClick={() => changeActiveSlide(index)}
					ref={(el) => {
						if (el) {
							carouselItems.current[index] = el;
						}
					}}
				/>
			))}
		</div>
	);
};
