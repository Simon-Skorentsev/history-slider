import cn from 'clsx';

import { useActiveSlideContext } from '@/hooks/useActiveSlideContext';

import { Slide } from '../type';

import { CircularCarousel } from './CircularCarousel/CircularCarousel';
import { DateCounter } from './DateCounter/DateCounter';

import styles from './HistoryPeriod.module.scss';

interface Props {
	slides: Slide[];
	className?: string;
}

export const HistoryPeriod = ({ slides, className }: Props) => {
	const activeSlide = useActiveSlideContext();

	return (
		<div className={cn(styles.historyPeriod, className)}>
			<div className={styles.period}>
				<DateCounter
					className={styles.from}
					year={slides[activeSlide].from}
				/>
				<DateCounter
					className={styles.to}
					year={slides[activeSlide].to}
				/>
			</div>
			<CircularCarousel slides={slides} />
		</div>
	);
};
