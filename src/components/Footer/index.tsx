import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { CopyRight } from './CopyRight';
import { MadeBy } from './MadeBy';
import { PoweredBy } from './PoweredBy';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const Footer: React.FC<IComponentProps> = ({ isLargeScreen }) => (
	<Flex
		alignItems="center"
		as="footer"
		flexDir="column"
		justifyContent="center"
		minH={setSize(Sizes.hfMaxHeight)}
		mt={isLargeScreen ? setSize(Sizes.gap) : 0}
	>
		<Flex
			alignItems="center"
			flex={1}
			flexDir={isLargeScreen ? 'row' : 'column'}
			justifyContent={isLargeScreen ? 'space-between' : 'center'}
			maxW={setSize(Sizes.maxWidth)}
			w={isLargeScreen ? 'full' : 'initial'}
		>
			<CopyRight />
			<MadeBy />
			<PoweredBy />
		</Flex>
	</Flex>
);
