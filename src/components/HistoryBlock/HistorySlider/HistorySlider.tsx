import cn from 'clsx';

import { DynamicNumber } from '../../ui/DynamicNumber/DynamicNumber';
import { Slide } from '../type';

import { HistoryCarousel } from './HistoryCarousel/HistoryCarousel';

import styles from './HistorySlider.module.scss';

interface Props {
	slides: Slide[];
	activeSlide: number;
	setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
	className?: string;
}

export const HistorySlider = ({ slides, activeSlide, setActiveSlide, className }: Props) => {
	return (
		<div className={cn(styles.historySlider, className)}>
			<div className={styles.period}>
				<DynamicNumber
					className={styles.from}
					number={slides[activeSlide].from}
				/>
				<DynamicNumber
					className={styles.to}
					number={slides[activeSlide].to}
				/>
			</div>
			<HistoryCarousel
				slides={slides}
				activeSlide={activeSlide}
				setActiveSlide={setActiveSlide}
			/>
		</div>
	);
};
