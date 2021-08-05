import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { setSize } from '../../helpers';
import { Colors, Sizes } from '../../constants';

import { Backgrounds } from './Backgrounds';
import { Preview } from './Preview';
import { useAddPost } from '../AddPost/helpers';
import { IPost } from '../../models';
import { usePost } from '../Post/helpers';

export interface IPostEditorProps {
	post?: IPost;
}

export const PostEditor: React.FC<IPostEditorProps> = ({ post }) => {
	const {
		background: bg,
		content,
		errMsg,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleSubmit,
		isEditingPost,
	} = post ? usePost(post) : useAddPost();

	const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
		e => handleContentChange({ text: e.target.value });

	const isEditing = post && post.id === isEditingPost;

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
				value={content?.text ? content.text : ''}
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
			{content?.image || content?.video ? (
				<Preview content={content} />
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
