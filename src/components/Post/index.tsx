import { Flex } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../helpers';
import { IPost } from '../../models';
import { Sizes } from '../../constants';

import { usePost } from './helpers';

import { PostEditor } from '../PostEditor';
import { PostBody } from './PostBody';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface IComponentProps {
	post: IPost;
}

export const Post: React.FC<IComponentProps> = ({ post }) => {
	const {
		bg,
		content,
		errMsg,
		isEditing,
		handleBgChange,
		handleContentChange,
		handleDelete,
		handleSubmit,
		toggleIsEditing,
	} = usePost({ post });

	return (
		<Flex
			alignItems="center"
			flex={1}
			flexDir="column"
			justifyContent="center"
			m={setSize(Sizes.gap)}
			w="full"
		>
			<PostHeader
				creator={post.creator}
				createdAt={post.createdAt}
				handleDelete={handleDelete}
				pid={post.id}
			/>
			{isEditing ? (
				<Flex
					bgColor={bg ? bg : 'white'}
					borderLeft="0.1rem solid #6B46C1"
					borderRight="0.1rem solid #6B46C1"
					flex={1}
					flexDir="column"
					p={setSize(Sizes.gap / 2)}
					w="full"
				>
					<PostEditor
						bg={bg}
						errMsg={errMsg}
						handleBgChange={handleBgChange}
						handleCancel={toggleIsEditing}
						handleContentChange={handleContentChange}
						handleSubmit={handleSubmit}
						isEditing={!!isEditing}
						preview={content.image || content.video ? content : undefined}
						text={content.text}
					/>
				</Flex>
			) : (
				<PostBody background={post.background} content={post.content} />
			)}
			<PostFooter post={post} />
		</Flex>
	);
};
