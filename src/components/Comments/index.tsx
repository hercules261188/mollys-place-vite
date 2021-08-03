import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { IPost, IUser } from '../../models';

import { AvatarDisplay } from '../displays';
import { CommentEditor } from './CommentEditor';
import { CommentFeed } from './CommentFeed';

interface IComponentProps {
	currentUser: IUser;
	post: IPost;
}

export const Comments: React.FC<IComponentProps> = ({
	currentUser,
	post,
}) => {
	return (
		<Flex flexDir="column" w="full">
			{post.comments && <CommentFeed post={post} />}
			<Flex flex={1} mt={setSize(Sizes.gap)}>
				<AvatarDisplay user={currentUser} />
				<CommentEditor currentUser={currentUser} post={post} />
			</Flex>
		</Flex>
	);
};
