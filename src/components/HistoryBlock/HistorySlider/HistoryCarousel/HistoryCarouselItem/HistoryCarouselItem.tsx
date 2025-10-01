import cn from 'clsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import styles from './HistoryCarouselItem.module.scss';

interface Props {
	text: string;
	title: string;
	isActive: boolean;
	onClick?: () => void;
}

export interface HistoryCarouselItemRefs {
	itemElement: HTMLDivElement | null;
	titleElement: HTMLDivElement | null;
}

export const HistoryCarouselItem = forwardRef<HistoryCarouselItemRefs, Props>(
	({ title, text, isActive, onClick }, ref) => {
		const itemRef = useRef<HTMLDivElement>(null);
		const titleRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => ({
			itemElement: itemRef.current,
			titleElement: titleRef.current,
		}));

		return (
			<div
				ref={itemRef}
				className={cn(styles.carouselItem, {
					[styles['carouselItem--active']]: isActive,
				})}
				onClick={onClick}
			>
				<span className={styles.text}>{text}</span>
				<span
					ref={titleRef}
					className={styles.title}
				>
					{title}
				</span>
			</div>
		);
	},
);
