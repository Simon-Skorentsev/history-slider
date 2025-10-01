import cn from 'clsx';

import styles from './SliderButton.module.scss';

interface Props {
	isRight?: boolean;
}

export function SliderButton({ isRight, className, ...props }: Props & React.JSX.IntrinsicElements['button']) {
	return (
		<button
			className={cn(styles.button, className, {
				[styles['button--right']]: isRight,
			})}
			{...props}
		>
			<span className={styles.arrow} />
		</button>
	);
}
