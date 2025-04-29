import cn from 'clsx';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import { animationsConfig } from '@/config/animations';

import { useActiveSlideContext } from '@/hooks/useActiveSlideContext';
import { useSetterActiveSlideContext } from '@/hooks/useSetterActiveSlideContext';

import { degreesToRadians } from '@/utils/degrees-to-radians';

import { Slide } from '../../type';

import { CarouselItem, CarouselItemRefs } from './CarouselItem/CarouselItem';

import styles from './CircularCarousel.module.scss';

interface Props {
	slides: Slide[];
	direction?: 'counterclockwise' | 'clockwise';
}

export const CircularCarousel = ({ slides, direction = 'clockwise' }: Props) => {
	const radius = 265;
	const angle = 360 / slides.length;
	const rotationDirectionCoefficient = direction === 'counterclockwise' ? 1 : -1;
	const {
		circularCarousel: { rotateDur, titleDur },
	} = animationsConfig;

	const circularCarouselRef = useRef<HTMLDivElement>(null);
	const carouselItems = useRef<CarouselItemRefs[]>([]);
	const oldActiveIndex = useRef<number | null>(null);

	const activeSlide = useActiveSlideContext();
	const setActiveSlide = useSetterActiveSlideContext();

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
	}, [slides.length, angle]);

	// Эффект для анимации вращения
	useEffect(() => {
		const tl = gsap.timeline();

		const rotateAnimation = () => {
			if (!circularCarouselRef.current) return;

			// Вращение карусели
			tl.to(circularCarouselRef.current, {
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
	}, [activeSlide, slides.length, angle]);

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
	}, [activeSlide]);

	const changeActiveSlide = (index: number) => {
		oldActiveIndex.current = activeSlide;
		setActiveSlide && setActiveSlide(index);
	};

	return (
		<div
			className={cn(styles.circularCarousel, 'show-for-desktop-only')}
			ref={circularCarouselRef}
		>
			{slides.map((slide, index) => (
				<CarouselItem
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
