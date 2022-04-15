import axios from 'axios';
const apiInstance = () => axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

export const createGame = () => apiInstance().post('/games');

export const joinGame = (id: string) => apiInstance().patch(`/games/${id}/join`);

export const mySession = () => apiInstance().get('/sessions/me');
