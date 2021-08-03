import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FiX } from 'react-icons/fi';

import { setSize } from '../../helpers';
import { Colors, Sizes } from '../../constants';

interface IComponentProps {
	handleCancel: () => void;
}

export const ComposerHeader: React.FC<IComponentProps> = ({
	handleCancel,
}) => {
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
			<IconButton
				aria-label="close"
				borderRadius={setSize(Sizes.borderRadius / 2)}
				h={setSize(1.944)}
				icon={<Icon as={FiX} />}
				minW="auto"
				onClick={handleCancel}
				position="absolute"
				right={setSize(0.556)}
				top={setSize(0.556)}
				variant="outline"
				w={setSize(1.944)}
			/>
		</Flex>
	);
};
