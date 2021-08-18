import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../constants';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

interface IComponentProps {}

export const Layout: React.FC<IComponentProps> = ({ children }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	return (
		<Flex flex={1} flexDir="column" minH="100vh">
			<Header isLargeScreen={isLargeScreen} />
			<Main isLargeScreen={isLargeScreen}>{children}</Main>
			{isLargeScreen && <Footer isLargeScreen={isLargeScreen} />}
		</Flex>
	);
};
