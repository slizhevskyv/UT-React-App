import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReportView, TrackingView } from './views';
import { Route as RouteEnum } from './enums';

function App() {
	return (
		<Routes>
			<Route path={RouteEnum.report} element={<ReportView />} />
			<Route path={RouteEnum.root} element={<TrackingView />} />
		</Routes>
	);
}

export default App;
