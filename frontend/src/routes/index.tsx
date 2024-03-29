// libraries
import React, {ReactElement, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-block-ui/style.css';

// Pages
import Home from 'views/home';
import Game from 'views/game';
import UserContext from '../context/user';
import { mySession } from '../services/api';

const App: React.FC = (): ReactElement => {
	const [userState, setUserState] = useState({ sessionId: '' });

	useEffect(() => {
		const sessionId = localStorage.getItem('sessionId');
		if (!sessionId || sessionId === 'null') {
			mySession()
				.then(({ data }) => {
					localStorage.setItem('sessionId', data.sessionId);
					setUserState(data);
				});
		}
		else {
			setUserState({
				sessionId,
			});
		}

	}, []);

	return (
		<ChakraProvider>
			<UserContext.Provider value={userState}>
				<Router>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/game/:id' element={<Game />} />
					</Routes>
				</Router>
			</UserContext.Provider>
		</ChakraProvider>
	); 
};

export default App;
