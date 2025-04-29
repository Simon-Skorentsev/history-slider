import { SetterActiveSlideContext } from '@/context/ActiveSlide';
import { useContext } from 'react';

export function useSetterActiveSlideContext() {
	const setActiveSlide = useContext(SetterActiveSlideContext);
	return setActiveSlide;
}