import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { IPost } from '../../models';
import { Colors } from '../../constants';
import { ImageDisplay, VideoDisplay } from '../displays';

interface IComponentProps {
	content: IPost['content'];
}

export const Preview: React.FC<IComponentProps> = ({ content }) => {
	const bg = useColorModeValue(Colors.light, Colors.dark);

	return (
		<Flex bg={bg}>
			{content.image ? (
				<ImageDisplay image={content.image} />
			) : (
				<VideoDisplay video={content.video} />
			)}
		</Flex>
	);
};
