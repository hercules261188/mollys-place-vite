import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../constants';
import { setSize } from '../helpers';

import { BannerImage, Feed, Overlay, SiteMenu } from '../components';
import { IBanner, PostFilterTypes } from '../models';

interface IComponentProps {
	banner: IBanner;
}

export const HomePage: React.FC<IComponentProps> = ({ banner }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	return (
		<>
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
				{banner.data && (
					<BannerImage {...banner} id="home" overlay={Overlay.light} />
				)}
				<Feed filter={PostFilterTypes.GENERAL} />
			</Flex>
		</>
	);
};
