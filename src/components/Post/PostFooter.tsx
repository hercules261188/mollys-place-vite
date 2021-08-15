import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { setSize } from '../../helpers';
import { IPost } from '../../models';
import { selectUser } from '../../state/user';
import { Colors, Sizes } from '../../constants';
import { Comments } from '../Comments';

interface IComponentProps {
	post: IPost;
}

export const PostFooter: React.FC<IComponentProps> = ({ post }) => {
	const { current: currentUser } = useSelector(selectUser);

	return (
		<Flex
			borderBottomRadius={setSize(Sizes.borderRadius)}
			bgGradient={Colors.gradient}
			color="whiteAlpha.900"
			minH={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			{currentUser && <Comments currentUser={currentUser} post={post} />}
		</Flex>
	);
};
