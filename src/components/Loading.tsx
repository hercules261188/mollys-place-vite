import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

import { Sizes, Strings } from '../constants';
import { setSize } from '../helpers';

import { Text } from './Text';

interface IComponentProps {}

export const Loading: React.FC<IComponentProps> = () => {
	const {
		site: { name },
	} = Strings;

	return (
		<Flex
			alignItems="center"
			flex={1}
			flexDir="column"
			h="100vh"
			justifyContent="center"
		>
			<Text as="h1" fontFamily="Great Vibes" mb={setSize(Sizes.gap)}>
				{name}
			</Text>
			<Spinner size="lg" />
		</Flex>
	);
};
