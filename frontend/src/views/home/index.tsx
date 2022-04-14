import React from 'react';
import {Button, Center, Flex, Heading, Stack, useColorModeValue} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	return <>
		<Center>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('black.50', 'white.800')
				}>
				<Stack align={'center'} >
					<Heading padding={'10px'} as={'h4'} >Tick Tak Toe!</Heading>
					<Button onClick={() => navigate('/game/123')} >Create and Start a Game</Button>
				</Stack>
			</Flex>
		</Center>
	</>;
};

export default Home;
