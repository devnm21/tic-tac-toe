export const getInitialGameBoardState = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return [...Array(9).keys()].reduce((acc, curr) => ({...acc, [curr]: {
		marked: null,
		markStyle: {
			backgroundColor: 'pink',
		}
	}}), {});
};
