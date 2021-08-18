import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostFilterTypes } from '../models';

import { selectPosts, setPosts } from '../state/posts';
import { selectUser } from '../state/user';
import { AddPostButton } from './AddPost';

import { Post } from './Post';
import { Text } from './Text';

interface IComponentProps {
	filter: PostFilterTypes;
}

export const Feed: React.FC<IComponentProps> = ({ filter }) => {
	const [nearBottom, setNearBottom] = React.useState(true);

	const feedRef = React.useRef<HTMLDivElement | null>(null);

	const { current: currentUser } = useSelector(selectUser);

	const dispatch = useDispatch();
	const { cursor, error, isEnd, list, loading } = useSelector(selectPosts);

	const getPosts = () => {
		dispatch(setPosts({ cursor, filter, isAuthed: !!currentUser }));
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

	// Event listener setup and teardown...
	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Initial load...
	React.useEffect(() => {
		if (!cursor) {
			getPosts();
		}
	}, []);

	// Load more...
	React.useEffect(() => {
		if (!isEnd && !loading && cursor && nearBottom) {
			console.log(`Load more...`);
			getPosts();
		}
	}, [nearBottom]);

	return (
		<Flex alignItems="center" flexDir="column" w="full">
			<Flex
				alignItems="center"
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
			{currentUser && currentUser.role === `admin` && <AddPostButton />}
		</Flex>
	);
};
