import cn from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';

import styles from './Heading.module.scss';

interface Props {
	className?: string;
}

export function Heading({ children, className }: PropsWithChildren<Props>) {
	return <h2 className={cn(styles.title, className)}>{children}</h2>;
}
