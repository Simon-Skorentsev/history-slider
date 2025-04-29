import cn from 'clsx';

import styles from './OpacityOverlay.module.scss';

interface Props {
	eventsLength: number;
	progress: number;
}

export function OpacityOverlay({ eventsLength, progress }: Props) {
	const getOpacity = () => {
		if (eventsLength < 3) {
			return 1 - progress > 0.2 ? 1 - progress : 0;
		}

		const startDecreaseOpacity = 1 - 1.12 / eventsLength;
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
