import React, { ReactElement } from 'react';


interface Props {
	markStyle: object;
}

const Block: React.FC<Props> = ({ markStyle }: Props): ReactElement => {
	return  <>
		<div style={{
			width: '150px',
			height: '150px',
			...markStyle,
			border: '1px solid red'
		}} >
		</div>
	</>;
};

export default Block;
