// libraries
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// Pages
import Home from 'views/home';
import Game from 'views/game';

const App: React.FC = (): ReactElement => {
	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/newGame/:id' element={<Game />} />
				</Routes>
			</Router>
		</ChakraProvider>
	); 
};

export default App;
