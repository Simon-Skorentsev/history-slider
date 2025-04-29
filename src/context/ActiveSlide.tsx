import { PropsWithChildren, createContext, useState } from 'react';

export const ActiveSlideContext = createContext(0);
export const SetterActiveSlideContext = createContext<React.Dispatch<React.SetStateAction<number>> | undefined>(
	undefined,
);

export function ActiveSlideProvider({ children }: PropsWithChildren<unknown>) {
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<ActiveSlideContext.Provider value={activeSlide}>
			<SetterActiveSlideContext.Provider value={setActiveSlide}>{children}</SetterActiveSlideContext.Provider>
		</ActiveSlideContext.Provider>
	);
}
