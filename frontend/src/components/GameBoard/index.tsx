import React, {ReactElement, useEffect, useState} from 'react';
import Block from 'components/GameBoard/Block';
import {Grid, GridItem } from '@chakra-ui/react';
import {getInitialGameBoardState} from '../../utils';

interface Props {
	onWinning: (player: string) => void;
}

const GameBoard : React.FC<Props> = ({ onWinning }: Props): ReactElement => {

	const [blocks, setBlocks] = useState(getInitialGameBoardState());
	const [lastPlayedByMe, setLastPlayed] = useState(true);

	const toggleLastPlayed = () => setLastPlayed(!lastPlayedByMe);

	const getUserIfMarkingsAreSame = (_blocks: any[]) => {
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

	const checkIfWon = () => {
		return checkDiagonally() || checkVertically() || checkHorizontally();
	};

	const onBlockClick = (id: any) => {
		if (blocks[id].markType)
			return ;
		const newBlocksState = {
			...blocks,
			[id]: {
				markType: lastPlayedByMe ? 'p1' : 'p2',
				markStyle: {
					backgroundColor: lastPlayedByMe ? 'brown': 'yellow',
				},
			}
		};
		console.log(newBlocksState );
		setBlocks(newBlocksState);
		toggleLastPlayed();
	};

	useEffect(() => {
		const winningPlayer = checkIfWon();
		if (winningPlayer)
			onWinning(winningPlayer);
	}, [blocks]);

	return  <>

		<Grid
			templateColumns='repeat(3, 1fr)'
			gap={1}
			alignContent={'space-around'}
		>
			{
				Object.entries(blocks).map(
					([key, block]) =>
						<GridItem
							key={key}
							id={key}
							colSpan={1}
							bg='papayawhip'
							as={'div'}
							onClick={() => onBlockClick(key)}
							style={{
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								cursor: block?.markType ? 'not-allowed': 'pointer',
							}}
						>
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/*  @ts-ignore */}
							<Block markStyle={block.markStyle} />
						</GridItem>
				)
			}
		</Grid>
	</>;
};

export default GameBoard;
