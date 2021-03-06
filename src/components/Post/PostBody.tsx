import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { IPost } from '../../models';
import { Colors } from '../../constants';
import {
	ImageDisplay,
	RecipeDisplay,
	TextDisplay,
	VideoDisplay,
} from '../displays';

interface IComponentProps {
	background?: IPost['background'];
	content: IPost['content'];
}

export const PostBody: React.FC<IComponentProps> = ({
	background,
	content,
}) => {
	const bgColor = useColorModeValue(
		'whiteAlpha.900',
		Colors.dark.surfaceColor
	);

	return (
		<Flex
			bgColor={bgColor}
			borderLeft="0.1rem solid #6B46C1"
			borderRight="0.1rem solid #6B46C1"
			flex={1}
			flexDir="column"
			w="full"
		>
			{content.text && (
				<TextDisplay background={background} text={content.text} />
			)}
			{content.image && <ImageDisplay image={content.image} />}
			{content.recipe && <RecipeDisplay recipe={content.recipe} />}
			{content.video && <VideoDisplay video={content.video} />}
		</Flex>
	);
};
