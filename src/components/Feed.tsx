import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostFilters } from '../models';

import { useAuth } from '../services';
import { resetPosts, selectPosts, setPosts } from '../state/posts';

import { Post } from './Post';
import { Text } from './Text';

interface IComponentProps {
	filter: PostFilters | null;
}

export const Feed: React.FC<IComponentProps> = ({ filter }) => {
	const [currentFilter, setCurrentFilter] =
		React.useState<PostFilters | null>(null);
	const [nearBottom, setNearBottom] = React.useState(true);
	const feedRef = React.useRef<HTMLDivElement | null>(null);

	const { currentUser } = useAuth();

	const dispatch = useDispatch();
	const { cursor, error, isEnd, list, loading } = useSelector(selectPosts);

	const getPosts = () => {
		dispatch(
			setPosts({ cursor, filter: currentFilter, isAuthed: !!currentUser })
		);
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

	const resetFeed = () => {
		dispatch(resetPosts());
		setNearBottom(true);
		setCurrentFilter(filter);
	};

	// Setup and teardown of scroll event listener...
	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Initial load...
	React.useEffect(() => {
		getPosts();
	}, [currentFilter]);

	// Filter changed...
	React.useEffect(() => {
		if (filter !== currentFilter) {
			resetFeed();
		}
	}, [filter]);

	// Load more...
	React.useEffect(() => {
		if (cursor && !isEnd && !loading && nearBottom) {
			getPosts();
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
