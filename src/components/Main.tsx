import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { Sizes } from '../constants';
import { setSize } from '../helpers';
import { selectUser } from '../state/user';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const Main: React.FC<IComponentProps> = ({
	children,
	isLargeScreen,
}) => {
	const { error } = useSelector(selectUser);

	const errMsg = error
		? error.message
			? error.message
			: `Something went wrong.`
		: null;

	return errMsg ? (
		<Flex>{errMsg}</Flex>
	) : (
		<Flex alignItems="center" as="main" flex={1} flexDir="column">
			<Flex
				flex={1}
				flexDir={isLargeScreen ? 'row' : 'column'}
				maxW={setSize(Sizes.maxWidth)}
				position="relative"
				w="full"
			>
				{children}
			</Flex>
		</Flex>
	);
};
