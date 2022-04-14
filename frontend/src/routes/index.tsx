// libraries
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from 'views/home';

const IndexRouter: React.FC = (): ReactElement => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	);
};

export default IndexRouter;
