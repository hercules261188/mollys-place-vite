import { Flex, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../constants';
import { setSize } from '../helpers';

interface IComponentProps {
	dimensions: {
		height: number;
		width: number;
	};
	name: string;
	overlay?: Overlay;
	src: string;
}

export enum Overlay {
	light = `blackAlpha.300`,
	medium = `blackAlpha.500`,
	dark = `blackAlpha.700`,
}

export const BannerImage: React.FC<IComponentProps> = ({
	children,
	dimensions: { height, width },
	name,
	overlay,
	src,
}) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	if (!isLargeScreen) {
		height = height / 2;
		width = width / 2;
	}

	return (
		<Flex
			alignItems="center"
			borderRadius={setSize(Sizes.borderRadius)}
			h="20vh"
			mb={setSize(Sizes.gap)}
			overflow="hidden"
			position="relative"
		>
			<Image alt={name} h={height} objectFit="cover" src={src} w={width} />
			{overlay && (
				<Flex
					bgColor={overlay}
					h="full"
					left={0}
					position="absolute"
					top={0}
					w="full"
				/>
			)}
			{children && (
				<Flex
					bgColor={overlay}
					h="full"
					left={0}
					position="absolute"
					top={0}
					w="full"
				>
					{children}
				</Flex>
			)}
		</Flex>
	);
};
