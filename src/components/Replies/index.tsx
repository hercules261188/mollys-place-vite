import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { IPost, IPostComment, IUser } from '../../models';
import { selectCurrentUser } from '../../state/user';

import { AvatarDisplay } from '../displays';
import { useReply } from './helpers';
import { RepliesFeed } from './RepliesFeed';
import { ReplyEditor } from './ReplyEditor';

interface IComponentProps {
	comment: IPostComment;
	currentUser: IUser;
	post: IPost;
}

export const Replies: React.FC<IComponentProps> = ({
	comment,
	currentUser,
	post,
}) => {
	const { isReplying } = useReply({
		cid: comment.id,
		creator: currentUser,
		post,
	});

	return (
		<Flex flexDir="column" w="full">
			{comment.replies && <RepliesFeed comment={comment} post={post} />}
			{isReplying && (
				<Flex flex={1}>
					<AvatarDisplay user={currentUser} />
					<ReplyEditor
						cid={comment.id}
						currentUser={currentUser}
						post={post}
					/>
				</Flex>
			)}
		</Flex>
	);
};
