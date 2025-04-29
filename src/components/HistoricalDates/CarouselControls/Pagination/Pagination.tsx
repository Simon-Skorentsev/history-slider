import cn from 'clsx';

import styles from './Pagination.module.scss';

interface Props {
	activeSlide: number;
	count: number;
	className?: string;
	onPaginationClick?: (index: number) => void;
}

export function Pagination({ count, activeSlide, className, onPaginationClick }: Props) {
	const onClick = (index: number) => {
		if (onPaginationClick) {
			onPaginationClick(index);
		}
	};

	const dots = Array.from({ length: count }, (_, index) => (
		<div
			key={index}
			onClick={() => onClick(index)}
			className={cn(styles.dot, {
				[styles['dot--active']]: activeSlide === index,
			})}
		/>
	));

	return <div className={cn(styles.pagination, className)}>{dots}</div>;
}
