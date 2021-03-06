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
	const { isEditingPost, handleDelete } = usePost();

	const isEditing = post.id === isEditingPost;

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
				filters={post.filters}
				handleDelete={handleDelete}
				pid={post.id}
			/>
			{isEditing ? (
				<Flex
					bgColor={post.background ? post.background : 'white'}
					borderLeft="0.1rem solid #6B46C1"
					borderRight="0.1rem solid #6B46C1"
					flex={1}
					flexDir="column"
					p={setSize(Sizes.gap / 2)}
					w="full"
				>
					{<PostEditor post={post} />}
				</Flex>
			) : (
				<PostBody background={post.background} content={post.content} />
			)}
			<PostFooter post={post} />
		</Flex>
	);
};
