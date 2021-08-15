import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Colors, Sizes } from '../constants';
import { setSize } from '../helpers';

import { SiteLogo } from './logos';
import { SiteMenu, UserMenu } from './menus';

interface IComponentProps {
	isLargeScreen: boolean;
	signOut: () => Promise<void>;
}

export const Header: React.FC<IComponentProps> = ({
	isLargeScreen,
	signOut,
}) => (
	<Flex
		as="header"
		bgGradient={Colors.gradient}
		flex={1}
		justifyContent="center"
		mb={setSize(Sizes.gap)}
		maxH={setSize(Sizes.hfMaxHeight)}
		minH={setSize(Sizes.hfMaxHeight)}
		position="sticky"
		top={0}
		zIndex={1}
	>
		<Flex
			alignItems="center"
			flex={1}
			maxW={setSize(Sizes.maxWidth)}
			mx={isLargeScreen ? 0 : setSize(Sizes.gap)}
			justifyContent="space-between"
		>
			{!isLargeScreen && <SiteMenu isLargeScreen={isLargeScreen} />}
			<Flex alignItems="center">
				<SiteLogo large />
			</Flex>
			<Flex>
				<UserMenu signOut={signOut} />
			</Flex>
		</Flex>
	</Flex>
);
