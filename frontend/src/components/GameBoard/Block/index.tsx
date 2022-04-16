import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {GridItem} from '@chakra-ui/react';
import cross from '../../../assets/images/cross.png';
import naught from '../../../assets/images/naught.png';


interface Props {
	id: string;
	onClick: (id: string) => void;
	markType: string;
	turnType: string;
}

const Block: React.FC<Props> = ({ id, onClick, markType, turnType }: Props): ReactElement => {
	const [isMouseOver, setIsMouseOver] = useState(false);
	const [style, setStyle] = useState({});

	const getBackgroundImageStyle = () => {
		if (markType) {
			return {
				cursor: 'not-allowed',
				backgroundImage: `url(${markType === 'naught' ? naught: cross})`,
			};
		}
		else if (isMouseOver)
			return {
				cursor: 'pointer',
				backgroundImage: `url(${turnType === 'naught' ? naught: cross})`,
				opacity: 0.6
			};
		 return {
			cursor: 'pointer',
		 };
	};

	useEffect(() => {
		setStyle(getBackgroundImageStyle);
	}, [isMouseOver, markType	]);

	return  <>
		<GridItem
			id={id}
			colSpan={1}
			bg='white'
			as={'div'}
			onClick={() => onClick(id)}
		>
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/*  @ts-ignore */}
			<div
				style={{
					width: '150px',
					height: '150px',
					border: '1px solid red',
					...style,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100%',
				}}
				onMouseOver={() => {
					setIsMouseOver(true);
				}}
				onMouseOut={() => {
					setIsMouseOver(false);
				}}
			>
			</div>
		</GridItem>
	</>;
};

export default Block;
