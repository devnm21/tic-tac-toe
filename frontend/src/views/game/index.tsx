import React from 'react';
import {Flex, Heading, Stack, useColorModeValue} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import GameBoard from 'components/GameBoard';

const Game = () => {
	const { id } = useParams<{id: string}>();


	return <>
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('black.50', 'white.800')
			}>
			<Stack align={'center'} >
				<Heading as={'h1'} >
					Make your move!
					{id}
				</Heading>
				<GameBoard />
			</Stack>
		</Flex>

	</>;
};

export default Game;
