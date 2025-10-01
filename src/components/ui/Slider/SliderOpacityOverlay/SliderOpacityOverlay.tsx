import cn from 'clsx';

import styles from './SliderOpacityOverlay.module.scss';

interface Props {
	slidesNumber: number;
	progress: number;
}

export function SliderOpacityOverlay({ slidesNumber, progress }: Props) {
	const getOpacity = () => {
		if (slidesNumber < 3) {
			return 1 - progress > 0.2 ? 1 - progress : 0;
		}

		const startDecreaseOpacity = 1 - 1.12 / slidesNumber;
		if (progress > startDecreaseOpacity) {
			return (1 - progress) * (1 / (1 - startDecreaseOpacity));
		}

		return 1;
	};
	return (
		<div
			className={cn(styles.opacityOverlay, 'show-for-mobile-only')}
			style={{
				opacity: getOpacity(),
			}}
		/>
	);
}
