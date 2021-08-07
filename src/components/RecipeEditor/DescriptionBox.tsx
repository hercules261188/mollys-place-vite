import { Flex } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { Text } from '../Text';

interface IComponentProps {}

export const DescriptionBox: React.FC<IComponentProps> = () => {
	const [description, setDescription] = React.useState(``);

	const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
		e => setDescription(e.target.value);
	return (
		<Flex flexDir="column" mt={setSize(Sizes.gap / 2)}>
			<Text as="h4">Description</Text>
			<TextareaAutosize
				onChange={handleTextChange}
				minRows={3}
				style={styles.textArea}
				value={description}
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
