import cn from 'clsx';
import type { PropsWithChildren } from 'react';

import styles from './Title.module.scss';

interface Props {
	className?: string;
}

export function Title({ children, className }: PropsWithChildren<Props>) {
	return <h1 className={cn(styles.title, className)}>{children}</h1>;
}
