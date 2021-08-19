import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { BannerImage, Text } from '../components';
import { Sizes, Strings } from '../constants';
import { setSize } from '../helpers';
import { IBanner } from '../models';

interface IComponentProps {
	banner: IBanner;
}

export const AboutPage: React.FC<IComponentProps> = ({ banner }) => {
	const innerBorderSize = useColorModeValue(16.389, 16);

	const {
		site: { name, owner },
	} = Strings;

	return (
		<Flex flex={1}>
			<Flex flex={1} flexDir="column">
				<Text
					as="h1"
					fontFamily="Great Vibes"
					fontWeight="normal"
					mb={setSize(Sizes.gap)}
					textAlign="center"
				>
					{`Welcome to ${name}!`}
				</Text>
				<Text alignItems="flex-start">
					&nbsp;&nbsp;&nbsp;&nbsp;Welcome to my little spot on the
					internet, I hope you enjoy your visit!
				</Text>
			</Flex>
			<Flex alignItems="center" flex={1} flexDir="column">
				<Flex
					alignItems="center"
					border={`${setSize(0.278)} solid goldenrod`}
					borderRadius={setSize(Sizes.borderRadius + 0.556)}
					justifyContent="center"
				>
					<Flex
						border={`${setSize(0.444)} solid transparent`}
						h={setSize(innerBorderSize)}
						position="relative"
						w={setSize(innerBorderSize)}
					>
						<BannerImage {...banner} id="about" />
					</Flex>
				</Flex>
				<Text
					as="h2"
					fontWeight="normal"
					mb={setSize(Sizes.gap)}
					textAlign="center"
				>
					Hi, I'm&nbsp;
					<Flex as="span" display="inline-flex" fontFamily="Great Vibes">
						{owner}
					</Flex>
					.
				</Text>
			</Flex>
		</Flex>
	);
};
