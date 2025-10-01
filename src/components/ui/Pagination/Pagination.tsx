import cn from 'clsx';

import styles from './Pagination.module.scss';

interface Props {
	active: number;
	count: number;
	className?: string;
	onPaginationClick?: (index: number) => void;
}

export function Pagination({ count, active, className, onPaginationClick }: Props) {
	const onDotClick = (index: number) => {
		if (onPaginationClick) {
			onPaginationClick(index);
		}
	};

	const dots = Array.from({ length: count }, (_, index) => (
		<div
			key={index}
			onClick={() => onDotClick(index)}
			className={cn(styles.dot, {
				[styles['dot--active']]: active === index,
			})}
		/>
	));

	return <div className={cn(styles.pagination, className)}>{dots}</div>;
}
