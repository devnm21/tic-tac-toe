import React, {useState} from 'react';
import {Flex, Heading, Stack, useColorModeValue} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import GameBoard from 'components/GameBoard';

const Game = () => {
	const { id } = useParams<{id: string}>();
	const [playerWon, setPlayerWon] = useState('');


	return <>
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('black.50', 'white.800')
			}>
			<Stack align={'center'} >
				<Heading as={'h1'} >
					{
						playerWon ?
							`${playerWon} Won!`
							: 'Make your move!'
					}
				</Heading>
				<GameBoard onWinning={player => setPlayerWon(player)} />
			</Stack>
		</Flex>

	</>;
};

export default Game;
