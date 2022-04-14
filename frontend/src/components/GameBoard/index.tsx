import React, {ReactElement, useEffect, useState} from 'react';
import Block from 'components/GameBoard/Block';
import {Grid, GridItem } from '@chakra-ui/react';
import {getInitialGameBoardState} from '../../utils';



const GameBoard : React.FC = (): ReactElement => {

	const [blocks, setBlocks] = useState(getInitialGameBoardState());
	const [lastPlayedByMe, setLastPlayed] = useState(false);

	const toggleLastPlayed = () => setLastPlayed(!lastPlayedByMe);

	const onBlockClick = (id: any) => {
		setBlocks({
			...blocks,
			[id]: {
				markStyle: {
					backgroundColor: lastPlayedByMe ? 'brown': 'yellow',
				},
			}
		});
		toggleLastPlayed();
	};
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

export default GameBoard ;
