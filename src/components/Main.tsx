import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../constants';
import { setSize } from '../helpers';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const Main: React.FC<IComponentProps> = ({
	children,
	isLargeScreen,
}) => (
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
