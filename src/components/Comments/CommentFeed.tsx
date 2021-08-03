import { Flex } from '@chakra-ui/react';
import React from 'react';

import { IPost } from '../../models';
import { Comment } from './Comment';

interface IComponentProps {
	post?: IPost;
}

export const CommentFeed: React.FC<IComponentProps> = ({ post }) => {
	const comments = post?.comments;
	const sortByCreatedAt = () =>
		Object.entries(comments!).sort(
			(current, next) => next[1].createdAt - current[1].createdAt
		);

	const commentList = () => {
		const sortedComments = sortByCreatedAt();
		return sortedComments.map(comment => (
			<Comment
				comment={{ id: comment[0], ...comment[1] }}
				key={comment[0]}
				post={post!}
			/>
		));
	};

	return <Flex flexDir="column">{commentList()}</Flex>;
};
