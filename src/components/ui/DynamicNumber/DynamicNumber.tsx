import cn from 'clsx';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { animationConstants } from '@/config/constants/animation.constants';

import styles from './DynamicNumber.module.scss';

interface Props {
	number: string;
	className?: string;
}

export const DynamicNumber = ({ number, className }: Props) => {
	const {
		dynamicNumber: { countDur },
	} = animationConstants;

	const counterRef = useRef<HTMLSpanElement>(null);
	const oldNumber = useRef('0');

	useEffect(() => {
		const tl = gsap.timeline();

		const countAnimation = () => {
			if (!counterRef.current) {
				return;
			}

			tl.from(counterRef.current, {
				textContent: oldNumber.current,
				duration: countDur,
				ease: 'power1.inOut',
				snap: { textContent: 1 },
			});

			oldNumber.current = number;
		};
		countAnimation();

		return () => {
			tl.kill();
		};
	}, [number]);

	return (
		<span
			className={cn(styles.year, className)}
			ref={counterRef}
		>
			{number}
		</span>
	);
};
