import React, {useContext, useEffect, useState} from 'react';
import {Flex, Heading, Stack, useColorModeValue, Text, Spinner} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import GameBoard from 'components/GameBoard';
import TopBar from 'views/game/topbar';
import {joinGame, mySession} from '../../services/api';
import UserContext from '../../context/user';

const Game = () => {
	const { id } = useParams<{id: string}>();
	const [playerWon, setPlayerWon] = useState('');
	const [isCreatedByCurrentPlayer, setIsCreatedByCurrentPlayer] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [serverError, setServerError] = useState('');
	const [game, setGame] = useState('');


	const user = useContext(UserContext);

	useEffect(() => {
		if (user.sessionId && id) {
			handleGameJoining(id);
		}
	}, [user, id]);

	const handleGameJoining = async (id: string) => {
		try {
			const gameRes = await joinGame(id);
			setGame(gameRes.data);
			setIsCreatedByCurrentPlayer(gameRes.data.sessionId === user.sessionId);
			setIsLoading(false);
		} catch (e: any) {
			setServerError(e?.response?.data);
			setIsLoading(false);
		}
	};



	return <>
		<TopBar
			gameId={id}
			isCreatedByCurrentPlayer={isCreatedByCurrentPlayer}
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
				{!isLoading && !serverError && <><Heading as={'h1'}>
					{
						playerWon ?
							`${playerWon} Won!`
							: 'Make your move!'
					}
				</Heading>
				<GameBoard onWinning={player => setPlayerWon(player)} />
				</>
				}
			</Stack>
		</Flex>

	</>;
};

export default Game;
