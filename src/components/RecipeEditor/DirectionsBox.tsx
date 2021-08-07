import { Flex } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { IPostRecipe } from '../../models';

import { Text } from '../Text';

interface IComponentProps {
	handleChange: ({}: IPostRecipe) => void;
	text?: string;
}

export const DirectionsBox: React.FC<IComponentProps> = ({
	handleChange,
	text,
}) => {
	const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
		e => handleChange({ directions: e.target.value } as IPostRecipe);

	return (
		<Flex flexDir="column" mt={setSize(Sizes.gap / 2)}>
			<Text as="h4">Directions</Text>
			<TextareaAutosize
				onChange={handleTextChange}
				minRows={3}
				style={styles.textArea}
				value={text}
			/>
		</Flex>
	);
};

const styles = {
	textArea: {
		border: `${setSize(0.056)} solid`,
		borderRadius: setSize(Sizes.borderRadius / 2),
	},
};
