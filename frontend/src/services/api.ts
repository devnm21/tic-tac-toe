import axios from 'axios';
import config from '../configs';
const apiInstance = () => axios.create({
	baseURL: config.API,
	withCredentials: true,
});

export const createGame = () => apiInstance().post('/games');

export const joinGame = (id: string) => apiInstance().patch(`/games/${id}/join`);

export const mySession = () => apiInstance().get('/sessions/me');
