import { Flex } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../../helpers';
import { Colors, Sizes } from '../../../constants';

import { Text } from '../../Text';

interface IComponentProps {}

export const ModalHeader: React.FC<IComponentProps> = () => {
	return (
		<Flex
			alignItems="center"
			bgGradient={Colors.gradient}
			borderTopRadius={setSize(Sizes.borderRadius)}
			color="whiteAlpha.900"
			h={setSize(3.333)}
			justifyContent="center"
			p={setSize(Sizes.gap / 2)}
			position="relative"
			w="full"
		>
			<Text fontFamily="Great Vibes" fontSize="2xl">
				Molly's Composer
			</Text>
		</Flex>
	);
};
