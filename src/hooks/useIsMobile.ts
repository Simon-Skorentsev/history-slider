import { useSyncExternalStore } from 'react';

export function useIsMobile() {
	const isMobileQuery = '(max-width: 62.4988em)';

	const subscribe = (callback: VoidFunction) => {
		const mediaQueryList = window.matchMedia(isMobileQuery);
		mediaQueryList.addEventListener('change', callback);

		return () => {
			mediaQueryList.removeEventListener('change', callback);
		};
	};

	const getSnapshot = () => {
		return window.matchMedia(isMobileQuery).matches;
	};

	return useSyncExternalStore(subscribe, getSnapshot);
}
