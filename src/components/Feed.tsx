import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPosts, setPosts } from '../state/posts';

import { Post } from './Post';
import { Text } from './Text';

interface IComponentProps {}

export const Feed: React.FC<IComponentProps> = () => {
	const [nearBottom, setNearBottom] = React.useState(true);

	const feedRef = React.useRef<HTMLDivElement | null>(null);

	const dispatch = useDispatch();
	const { error, isEnd, lastDoc, list, loading } =
		useSelector(selectPosts);

	const getPosts = () => {
		dispatch(setPosts(lastDoc));

		handleScroll();
		console.log(lastDoc);
	};

	const handleScroll = () => {
		if (feedRef.current) {
			const triggerHeight = feedRef.current.scrollHeight / 1.5;
			const reachingBottom = window.scrollY >= triggerHeight;
			if (nearBottom && !reachingBottom) {
				setNearBottom(false);
			} else if (reachingBottom) {
				setNearBottom(true);
			}
		}
	};

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	React.useEffect(() => {
		if (!isEnd && nearBottom) {
			console.log(`Loading more...`);
			getPosts();
		} else if (isEnd) {
			console.log(`End of Posts.`);
		}
	}, [nearBottom]);

	return (
		<Flex
			alignItems="center"
			as="section"
			css={{ '&::-webkit-scrollbar': { display: 'none' } }}
			flexDir="column"
			ref={feedRef}
			w="full"
		>
			{error ? (
				<Flex>{error.message}</Flex>
			) : (
				list && list.map(post => <Post key={post.id} post={post} />)
			)}
			{isEnd && (
				<Flex>
					<Text fontFamily="Great Vibes" fontSize="2rem">
						~ The End ~
					</Text>
				</Flex>
			)}
		</Flex>
	);
};
