import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { DescriptionBox } from './DescriptionBox';
import { DirectionsBox } from './DirectionsBox';
import { ImageBox } from './ImageBox';
import { IngredientsBox } from './IngredientsBox';

interface IComponentProps {}

export const RecipeEditor: React.FC<IComponentProps> = () => {
	return (
		<Flex
			as="article"
			flexDir="column"
			color={Colors.light.primaryTextColor}
		>
			<Flex>
				<Flex
					as="section"
					flex={1}
					flexDir="column"
					mr={setSize(Sizes.gap)}
				>
					<ImageBox />
					<DescriptionBox />
				</Flex>
				<IngredientsBox />
			</Flex>
			<DirectionsBox />
		</Flex>
	);
};
