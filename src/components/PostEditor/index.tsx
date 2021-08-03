import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { setSize } from '../../helpers';
import { IPost } from '../../models';
import { Colors, Sizes } from '../../constants';

import { Backgrounds } from './Backgrounds';
import { Preview } from './Preview';

export interface IPostEditorProps {
	bg?: string;
	errMsg: string;
	handleBgChange: (value: string) => void;
	handleCancel: () => void;
	handleContentChange: ({ text }: { text: string }) => void;
	handleSubmit: () => void;
	isEditing: boolean;
	preview?: IPost['content'];
	text?: string;
}

export const PostEditor: React.FC<IPostEditorProps> = ({
	bg,
	errMsg,
	handleBgChange,
	handleCancel,
	handleContentChange,
	handleSubmit,
	isEditing,
	preview,
	text,
}) => {
	const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
		e => handleContentChange({ text: e.target.value });

	return (
		<>
			<TextareaAutosize
				minRows={5}
				onChange={handleTextChange}
				style={{
					background: bg ? bg : 'white',
					color: bg ? 'white' : 'black',
					fontSize: bg ? '2rem' : 'initial',
					height: 200,
					outline: 'none',
					overflow: 'hidden',
				}}
				value={text ? text : ''}
			/>
			{isEditing && (
				<Flex justifyContent="flex-end" p={setSize(Sizes.gap)}>
					<Button
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						onClick={handleSubmit}
						variant="link"
					>
						Update
					</Button>
					<Text
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						px={setSize(Sizes.gap / 2)}
					>
						·
					</Text>
					<Button
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						onClick={handleCancel}
						variant="link"
					>
						Cancel
					</Button>
				</Flex>
			)}
			{preview ? (
				<Preview content={preview} />
			) : (
				<Backgrounds bg={bg} handleBgChange={handleBgChange} />
			)}
			{errMsg && (
				<Text color="red" my={setSize(Sizes.gap / 2)} textAlign="center">
					~ {errMsg} ~
				</Text>
			)}
		</>
	);
};
