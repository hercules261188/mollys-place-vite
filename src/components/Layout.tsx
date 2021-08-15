import { Flex, Spinner, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../constants';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

interface IComponentProps {
	signOut: () => Promise<void>;
}

export const Layout: React.FC<IComponentProps> = ({
	children,
	signOut,
}) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	return (
		<Flex flex={1} flexDir="column" minH="100vh">
			<Header isLargeScreen={isLargeScreen} signOut={signOut} />
			<Main isLargeScreen={isLargeScreen}>{children}</Main>
			{isLargeScreen && <Footer isLargeScreen={isLargeScreen} />}
		</Flex>
	);
};
