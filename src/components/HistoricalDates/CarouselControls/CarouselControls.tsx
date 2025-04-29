import cn from 'clsx';

import { Pagination } from '@/components/HistoricalDates/CarouselControls/Pagination/Pagination';

import { useActiveSlideContext } from '@/hooks/useActiveSlideContext';
import { useSetterActiveSlideContext } from '@/hooks/useSetterActiveSlideContext';

import { formatNumber } from '@/utils/format-number';

import styles from './CarouselControls.module.scss';

interface Props {
	slidesCount: number;
	className?: string;
}

export function CarouselControls({ slidesCount, className }: Props) {
	const activeSlide = useActiveSlideContext();
	const setActiveSlide = useSetterActiveSlideContext();

	const onPrevButtonClick = () => {
		if (setActiveSlide) {
			setActiveSlide((oldValue) => oldValue - 1);
		}
	};

	const onNextButtonClick = () => {
		if (setActiveSlide) {
			setActiveSlide((oldValue) => oldValue + 1);
		}
	};

	const onPaginationClick = (paginationDotIndex: number) => {
		if (setActiveSlide) {
			setActiveSlide(paginationDotIndex);
		}
	};

	return (
		<div className={cn(styles.controls, className)}>
			<div className={styles.left}>
				<span className={styles.text}>{`${formatNumber(activeSlide + 1)}/${formatNumber(slidesCount)}`}</span>
				<div className={styles.buttons}>
					<button
						className={cn(styles.button, styles['button--left'])}
						disabled={activeSlide === 0}
						onClick={onPrevButtonClick}
					>
						<span className={styles.arrow} />
					</button>
					<button
						className={styles.button}
						disabled={activeSlide === slidesCount - 1}
						onClick={onNextButtonClick}
					>
						<span className={styles.arrow} />
					</button>
				</div>
			</div>
			<div className={styles.center}>
				<Pagination
					className='show-for-mobile-only'
					activeSlide={activeSlide}
					count={slidesCount}
					onPaginationClick={onPaginationClick}
				/>
			</div>
		</div>
	);
}
