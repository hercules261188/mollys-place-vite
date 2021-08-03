import {
	Flex,
	Image,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../helpers';
import { IPost } from '../../models';
import { Colors, Sizes } from '../../constants';

interface IComponentProps {
	video: IPost['content']['video'];
}

export const VideoDisplay: React.FC<IComponentProps> = ({ video }) => {
	const color = useColorModeValue(
		Colors.dark.surfaceColor,
		Colors.light.surfaceColor
	);

	return (
		<Link href={`https://www.youtube.com/watch?v=${video!.id}`} isExternal>
			<Image alt={video!.title} src={video!.image} objectFit="contain" />
			<Flex color={color} flexDir="column" m={setSize(Sizes.gap / 2)}>
				<Text
					fontSize={setSize(0.75)}
					fontWeight="thin"
					letterSpacing="wider"
					textTransform="uppercase"
				>
					youtube.com
				</Text>
				<Text
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{video!.title}
				</Text>
			</Flex>
		</Link>
	);
};
