import { createContext } from 'react';

const UserContext = createContext({
	sessionId: null,
});

export default UserContext;
