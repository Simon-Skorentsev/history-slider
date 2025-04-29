import cn from 'clsx';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { animationsConfig } from '@/config/animations';

import styles from './DateCounter.module.scss';

interface Props {
	year: string;
	className?: string;
}

export const DateCounter = ({ year, className }: Props) => {
	const {
		dateCounter: { countDur },
	} = animationsConfig;

	const counterRef = useRef<HTMLSpanElement>(null);
	const oldYear = useRef('0');

	useEffect(() => {
		const tl = gsap.timeline();

		const countAnimation = () => {
			if (!counterRef.current) {
				return;
			}

			tl.from(counterRef.current, {
				textContent: oldYear.current,
				duration: countDur,
				ease: 'power1.inOut',
				snap: { textContent: 1 },
			});

			oldYear.current = year;
		};
		countAnimation();

		return () => {
			tl.kill();
		};
	}, [year]);

	return (
		<span
			className={cn(styles.year, className)}
			ref={counterRef}
		>
			{year}
		</span>
	);
};
