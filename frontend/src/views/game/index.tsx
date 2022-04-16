import React, {useContext, useEffect, useState} from 'react';
import {Flex, Heading, Stack, useColorModeValue, Text, Spinner, Button, useToast} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
import GameBoard from 'components/GameBoard';
import TopBar from 'views/game/topbar';
import {joinGame, mySession} from '../../services/api';
import UserContext from '../../context/user';
import config from '../../configs';
import JSConfetti from 'js-confetti';

interface gameState {
	_id: string;
	sessionId: string;
	isOver: boolean;
	isDraw: boolean;
	currentPlayerSessionId: string;
	joinedSessionId: string;
}
const Game = () => {
	const { id } = useParams<{id: string}>();
	const [playerWon, setPlayerWon] = useState('');
	const [isCreatedByCurrentPlayer, setIsCreatedByCurrentPlayer] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [serverError, setServerError] = useState('');
	const [currentPlayerSessionId, setCurrentPlayerSessionId] = useState('');
	const [audio] = useState(new Audio('https://client-public-content.s3.ap-south-1.amazonaws.com/aancoy2.mp3'));
	const [game, setGame] = useState<gameState>({
		_id: '',
		sessionId: '',
		isOver: false,
		currentPlayerSessionId: '',
		joinedSessionId: '',
		isDraw: false,
	});
	const user = useContext(UserContext);

	const [socket, setSocket] = useState<any>(null);
	const toast = useToast();


	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	useEffect(() => {
		const newSocket = io(config.WS_API,  {
			reconnectionDelay: 1000,
			reconnection: true,
			transports: ['polling'],
			agent: false,
			upgrade: false,
			rejectUnauthorized: false
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, [setSocket]);

	useEffect(() => {
		if (user.sessionId && id && socket)
			handleGameJoining(id);
	}, [user, id, socket]);


	const handleGameJoining = async (id: string) => {
		try {
			const gameRes = await joinGame(id);
			setGame(gameRes.data);
			setIsCreatedByCurrentPlayer(gameRes.data.sessionId === user.sessionId);
			setIsLoading(false);
			socket.emit('join', id);
		} catch (e: any) {
			setServerError(e?.response?.data);
			setIsLoading(false);
		}
	};


	const handleWinning = (playerMarkType: string) => {
		setPlayerWon(playerMarkType === 'naught' ? game?.sessionId: game?.joinedSessionId);
		setGame(game => ({
			...game,
			isOver: true,
		}));
	};

	useEffect(() => {
		if (playerWon && user.sessionId && playerWon === user.sessionId) {
			const jsConfetti = new JSConfetti();
			audio.play();
			jsConfetti.addConfetti();
		}
	}, [playerWon]);

	useEffect(() => {
		if (socket && id) {
			socket.on('player-joined-room', (joiningSessionId: string) => {
				console.log({
					joiningSessionId,
					user: user.sessionId,
				});
				if (game.joinedSessionId === joiningSessionId)
					toast({
						position: 'top',
						title: 'Player joined back!!'
					});
				else if (user.sessionId !== joiningSessionId)
					toast({
						position: 'top',
						title: 'Yay! Someone joined your game!'
					});
				joinGame(id).then(({ data }) => setGame(data));
			});
			return () => socket.off('player-joined-room');
		}
	}, [socket, user, id]);

	return <>
		<TopBar
			gameId={id}
			isCreatedByCurrentPlayer={isCreatedByCurrentPlayer}
			showCopyButton={!game.joinedSessionId}
		/>
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('black.50', 'white.800')
			}>
			<Stack align={'center'} >
				{serverError && <Text color={'red.600'} fontSize={'xl'}>{serverError}</Text>}
				{isLoading && <Spinner />}
				{game.isDraw && <Heading as={'h1'}> This is a Draw!</Heading>}
				{id && !isLoading && !serverError &&
					<>
						<Heading as={'h1'}>
							{
						 playerWon ?
									`${playerWon === user.sessionId ? 'You': 'Opponent'} Won!`
									: `${currentPlayerSessionId === user.sessionId ? 'Your': 'Opponent\'s '} Move`
							}
						</Heading>
						<GameBoard
							isPlayerTurn={currentPlayerSessionId === user.sessionId}
							turnType={user.sessionId === game?.sessionId ? 'naught': 'cross'}
							setCurrentPlayerSessionId={setCurrentPlayerSessionId}
							onWinning={playerMarkType => handleWinning(playerMarkType)}
							socket={socket}
							roomId={id}
							game={game}
							setGame={setGame}
							onDraw={() => setGame({ ...game, isDraw: true })}
						/>
					</>
				}
			</Stack>
		</Flex>

	</>;
};

export default Game;
