import React, {ReactElement, useEffect, useState} from 'react';
import {Button, HStack, useToast, Text} from '@chakra-ui/react';

interface Props {
	gameId: string | undefined;
	isCreatedByCurrentPlayer: boolean;
}

const TopBar : React.FC<Props> = ({ gameId, isCreatedByCurrentPlayer }): ReactElement => {

	const toast = useToast();
	// useEffect(() => {
	// }, []);

	const copyGameLinkToTextboard = () => {
		window.navigator.clipboard.writeText(window.location.href).then(() => {
			toast({
				title: 'Link copied!'
			});
		});
	};

	return  <>
		<HStack justifyContent={'space-between'} padding={'25px'} backgroundColor={'dimgrey'}  >
			<Text color={'white'} fontSize={'2xl'}> Game Id: {gameId}</Text>
			{isCreatedByCurrentPlayer && <Button onClick={copyGameLinkToTextboard} >Click to copy the game joining link</Button>}
		</HStack>
	</>;
};

export default TopBar ;
