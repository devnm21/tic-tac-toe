import React from 'react';
import {Button, Center, Heading, Stack} from '@chakra-ui/react';

const Home = () => {
	return <>
		<Center>
			<Stack marginTop={'23%'} >
				<Heading padding={'10px'} as={'h4'} >Tick Tak Toe!</Heading>
				<Button>Create and Start a Game</Button>
			</Stack>

		</Center>
	</>;
};

export default Home;
