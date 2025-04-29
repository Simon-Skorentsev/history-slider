import { useEffect, useState } from 'react';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	const getIsMobile = () => {
		return window.matchMedia(`(max-width: ${1000}px)`).matches;
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(getIsMobile())
		}
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
}