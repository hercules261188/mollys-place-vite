import { Flex } from '@chakra-ui/react';
import React from 'react';

import { useRetrievePosts } from '../services';

import { Post } from './Post';
import { Text } from './Text';

interface IComponentProps {}

export const Feed: React.FC<IComponentProps> = () => {
	const { errMsg, posts } = useRetrievePosts();

	return (
		<Flex alignItems="center" as="section" flexDir="column" w="full">
			{errMsg ? (
				<Flex>{errMsg}</Flex>
			) : (
				posts && posts.map(post => <Post key={post.id} post={post} />)
			)}
			<Flex>
				<Text fontFamily="Great Vibes" fontSize="2rem">
					~ The End ~
				</Text>
			</Flex>
		</Flex>
	);
};
