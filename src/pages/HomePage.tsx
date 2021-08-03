import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Sizes, Strings } from '../constants';
import { setSize } from '../helpers';

import {
	BannerImage,
	Composer,
	Feed,
	Layout,
	Overlay,
	SiteMenu,
} from '../components';

interface IComponentProps {}

export const HomePage: React.FC<IComponentProps> = () => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const { featuredImage } = Strings;

	return (
		<Layout>
			{isLargeScreen && <SiteMenu isLargeScreen />}
			<Flex
				alignItems="center"
				as="section"
				borderLeft={isLargeScreen ? '0.1rem solid' : 'none'}
				flex={3.5}
				flexDir="column"
				mx={setSize(Sizes.gap)}
				pl={isLargeScreen ? setSize(Sizes.gap) : 0}
			>
				<BannerImage {...featuredImage} overlay={Overlay.light} />
				<Composer />
				<Feed />
			</Flex>
		</Layout>
	);
};
