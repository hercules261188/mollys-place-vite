import { Flex, Input } from '@chakra-ui/react';
import React from 'react';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { IPost, IPostRecipe } from '../../models';
import { useAddPost } from '../AddPost/helpers';
import { usePost } from '../Post/helpers';

import { Text } from '../Text';
import { DescriptionBox } from './DescriptionBox';
import { DirectionsBox } from './DirectionsBox';
import { ImageBox } from './ImageBox';
import { IngredientsBox } from './IngredientsBox';

interface IComponentProps {
	post?: IPost;
}

export const RecipeEditor: React.FC<IComponentProps> = ({ post }) => {
	const { content, handleContentChange } = post
		? usePost(post)
		: useAddPost();

	const initialState: IPostRecipe = {
		description: ``,
		directions: ``,
		image: {} as IPostRecipe['image'],
		ingredients: [] as IPostRecipe['ingredients'],
		name: ``,
	};

	const recipe = content ? content.recipe : initialState;

	console.log(recipe);

	const handleChange = (change: IPostRecipe) =>
		handleContentChange({
			recipe: { ...recipe!, ...change },
		} as IPost['content']);

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
					<Text as="h4">Name</Text>
					<Input
						_hover={{ borderColor: Colors.dark.surfaceColor }}
						border={`${setSize(0.056)} solid`}
						borderColor={Colors.dark.surfaceColor}
						mb={setSize(Sizes.gap / 2)}
						onChange={e =>
							handleChange({ name: e.target.value } as IPostRecipe)
						}
						type="text"
						value={recipe?.name}
					/>
					<ImageBox handleChange={handleChange} preview={recipe?.image} />
					<DescriptionBox
						handleChange={handleChange}
						text={recipe?.description}
					/>
				</Flex>
				<IngredientsBox
					handleChange={handleChange}
					ingredients={recipe?.ingredients}
				/>
			</Flex>
			<DirectionsBox
				handleChange={handleChange}
				text={recipe?.directions}
			/>
		</Flex>
	);
};
