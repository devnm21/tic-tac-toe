import React, {Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState} from 'react';
import Block from 'components/GameBoard/Block';
import {Grid, GridItem, Spinner, Text} from '@chakra-ui/react';
import {getInitialGameBoardState} from '../../utils';
import { Socket } from 'socket.io-client';
import UserContext from '../../context/user';
import BlockUi from 'react-block-ui';

interface Props {
	onWinning: (player: string) => void;
	socket: Socket;
	roomId: string;
	isPlayerTurn: boolean;
	setCurrentPlayerSessionId: Dispatch<SetStateAction<string>>;
	turnType: string;
	game: any;
	setGame: any;
	onDraw: () => void;
}

const GameBoard : React.FC<Props> = ({ onWinning, socket, roomId, turnType, isPlayerTurn, setCurrentPlayerSessionId, game,  setGame, onDraw }: Props): ReactElement => {

	const [blocks, setBlocks] = useState(getInitialGameBoardState());
	const [lastPlayedByMe, setLastPlayed] = useState(true);
	const user = useContext(UserContext);

	const toggleLastPlayed = () => setLastPlayed(!lastPlayedByMe);

	const getUserIfMarkingsAreSame = (_blocks: any[]): string | null => {
		const mType = _blocks[0].markType;
		const isMarkedBySameUser = _blocks.every(block => block.markType === mType);
		return isMarkedBySameUser ? mType : null;
	};

	const checkHorizontally = () => {
		return getUserIfMarkingsAreSame([blocks[0], blocks[1], blocks[2]])
			|| getUserIfMarkingsAreSame([blocks[3], blocks[4], blocks[5]])
			|| getUserIfMarkingsAreSame([blocks[6], blocks[7], blocks[8]]);
	};

	const checkVertically = () => {
		return getUserIfMarkingsAreSame([blocks[0], blocks[3], blocks[6]])
			|| getUserIfMarkingsAreSame([blocks[1], blocks[4], blocks[7]])
			|| getUserIfMarkingsAreSame([blocks[2], blocks[5], blocks[8]]);
	};

	const checkDiagonally = () => {
		return getUserIfMarkingsAreSame([blocks[0], blocks[4], blocks[8]])
			|| getUserIfMarkingsAreSame([blocks[2], blocks[4], blocks[6]]);
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const checkIfAllBlocksAreMarked = () => Object.values(blocks).every(block => block.markType);

	const checkIfWon = () => {
		return checkDiagonally() || checkVertically() || checkHorizontally();
	};

	const onBlockClick = (id: any) => {
		if (blocks[id].markType)
			return ;
		socket.emit('player-move', { move: { blockIndex: id, turnType}, playerSessionId: user.sessionId,  roomId });
		toggleLastPlayed();
	};

	useEffect(() => {
		const winningPlayer = checkIfWon();
		if (winningPlayer)
			onWinning(winningPlayer);
		if (!winningPlayer && checkIfAllBlocksAreMarked())
			onDraw();
	}, [blocks]);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	useEffect(() => {
		socket.emit('get-game-moves', roomId);
		socket.on('player-move', (data: any) => {

			setCurrentPlayerSessionId(data.playerSessionId === game.sessionId ? game.joinedSessionId : game.sessionId);
			setBlocks((blocs: any) => ({
				...blocs,
				[Number(data.blockIndex)]: {
					markType: data.turnType,
				}
			}));
		});

		socket.on('game-join', (data: any) => {
			console.log({ data });
			setBlocks((blocs: any) => ({
				...blocs,
				...data.moves,
			}));
			if (data.joinedSessionId)
				setGame((game: any) => ({
					...game,
					joinedSessionId: data.joinedSessionId,
				}));
			setCurrentPlayerSessionId(data.currentPlayerSessionId);
		});

		return () => {
			socket.off('block-update');
			socket.off('game-join');
		};
	}, []);

	return  <>
		<BlockUi
			tag="div"
			blocking={!isPlayerTurn || game.isOver || game.isDraw}
			message={<Text fontSize={'3xl'} color={'black'} >{game.isOver ? 'GAME OVER' : 'Waiting for opponent\'s move'}</Text>}
			loader={game.isOver ? <></> : <Spinner />}
		>
			<Grid
				templateColumns='repeat(3, 1fr)'
				gap={1}
				alignContent={'space-around'}
			>
				{
					Object.entries(blocks).map(
						([key, block]) =>
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							<Block markType={block.markType}
								   turnType={turnType}
								   key={key}
								   id={key}
								   onClick={onBlockClick}
							/>
					)
				}
			</Grid>
		</BlockUi>
	</>;
};

export default GameBoard;
