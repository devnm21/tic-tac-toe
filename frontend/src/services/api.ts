import axios from 'axios';
import config from '../configs';
const apiInstance = () => axios.create({
	baseURL: config.API,
	withCredentials: true,
	headers: {
		'authorization': `Session ${window?.localStorage?.sessionId}`
	}
});

export const createGame = () => apiInstance().post('/games');

export const joinGame = (id: string) => apiInstance().patch(`/games/${id}/join`);

export const mySession = () => apiInstance().get('/sessions/me');
