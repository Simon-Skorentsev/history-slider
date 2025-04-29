import { ActiveSlideContext } from '@/context/ActiveSlide';
import { useContext } from 'react';

export function useActiveSlideContext() {
	const activeSlide = useContext(ActiveSlideContext);
	return activeSlide;
}