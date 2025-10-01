import cn from 'clsx';

import { Pagination } from '@/components/ui/Pagination/Pagination';
import { SliderButton } from '@/components/ui/Slider/SliderButton/SliderButton';

import { padNumber } from '@/utils/padNumber';

import styles from './SliderControls.module.scss';

interface Props {
	activeSlide: number;
	slidesCount: number;
	onPrevButtonClick?: VoidFunction;
	onNextButtonClick?: VoidFunction;
	onPaginationClick?: (paginationDotIndex: number) => void;
	className?: string;
}

export function SliderControls({
	activeSlide,
	slidesCount,
	onPrevButtonClick,
	onNextButtonClick,
	onPaginationClick,
	className,
}: Props) {
	return (
		<div className={cn(styles.wrapper, className)}>
			<div className={styles.controls}>
				<span className={styles.text}>{`${padNumber(activeSlide + 1)}/${padNumber(slidesCount)}`}</span>
				<div className={styles.buttons}>
					<SliderButton
						disabled={activeSlide === 0}
						onClick={onPrevButtonClick}
					/>
					<SliderButton
						isRight
						disabled={activeSlide === slidesCount - 1}
						onClick={onNextButtonClick}
					/>
				</div>
			</div>
			<div className={cn(styles.paginationWrapper, 'show-for-mobile-only')}>
				<Pagination
					active={activeSlide}
					count={slidesCount}
					onPaginationClick={onPaginationClick}
				/>
			</div>
		</div>
	);
}
