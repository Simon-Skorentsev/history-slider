import { type PropsWithChildren } from 'react';

import styles from './Layout.module.scss';

export function Layout({ children }: PropsWithChildren<unknown>) {
	return <main className={styles.layout}>{children}</main>;
}
