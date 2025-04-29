import { ReactElement, useCallback, useRef, useState } from 'react';

import { HistoricalDates } from './components/HistoricalDates/HistoricalDates';
import { Layout } from './components/layout/Layout';
import { ActiveSlideProvider } from './context/ActiveSlide';

import './App.scss';

export function App() {
	return (
		<ActiveSlideProvider>
			<Layout>
				<HistoricalDates />
			</Layout>
		</ActiveSlideProvider>
	);
}
