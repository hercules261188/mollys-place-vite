import { Flex, Icon, IconButton, Input } from '@chakra-ui/react';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { Text } from '../Text';

interface IComponentProps {}

export const IngredientsBox: React.FC<IComponentProps> = () => {
	const [ingredients, setIngredients] = React.useState<string[]>([]);

	const addIngredient = () => setIngredients([...ingredients, ``]);

	const handleChange = (index: number, value: string) =>
		setIngredients(
			ingredients.map((ingredient, idx) =>
				idx === index ? value : ingredient
			)
		);

	console.log(ingredients);

	return (
		<Flex as="section" flex={1} flexDir="column">
			<Flex alignItems="center" justifyContent="space-between">
				<Text as="h4">Ingredients</Text>
				<IconButton
					_hover={{ bgColor: `transparent` }}
					aria-label="add ingredient"
					icon={
						<Icon
							_hover={{ color: Colors.light.primaryTextColor }}
							as={FiPlusCircle}
							color={Colors.light.secondaryTextColor}
						/>
					}
					onClick={addIngredient}
					variant="ghost"
				/>
			</Flex>
			{ingredients.map((_, index) => (
				<IngredientInput
					handleChange={handleChange}
					index={index}
					key={index}
					value={ingredients[index]}
				/>
			))}
		</Flex>
	);
};

interface IIngredientInputProps {
	handleChange: (index: number, value: string) => void;
	index: number;
	value: string;
}

const IngredientInput: React.FC<IIngredientInputProps> = ({
	handleChange,
	index,
	value,
}) => {
	return (
		<Input
			_hover={{ borderColor: Colors.dark.surfaceColor }}
			border={`${setSize(0.056)} solid`}
			borderColor={Colors.dark.surfaceColor}
			mb={setSize(Sizes.gap / 2)}
			onChange={e => handleChange(index, e.target.value)}
			type="text"
			value={value}
		/>
	);
};