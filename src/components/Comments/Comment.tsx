import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../state/user';
import { selectEditingComment } from '../../state/system';

import { setSize } from '../../helpers';
import { IPost, IPostComment } from '../../models';
import { Colors, Sizes } from '../../constants';

import { useComment } from './helpers';

import { AvatarDisplay } from '../displays';
import { MoreMenu } from '../menus/MoreMenu';
import { CommentEditor } from './CommentEditor';
import { Replies } from '../Replies';

interface IComponentProps {
	comment: IPostComment;
	post: IPost;
}

export const Comment: React.FC<IComponentProps> = ({ comment, post }) => {
	const { handleDelete, toggleIsReplying } = useComment({
		cid: comment.id,
		creator: comment.creator,
		post,
	});

	const currentUser = useSelector(selectCurrentUser);
	const commentId = useSelector(selectEditingComment);
	const isEditing = commentId === comment.id;

	const bgColor = useColorModeValue(
		Colors.light.surfaceColor,
		Colors.dark.surfaceColor
	);
	const color = useColorModeValue(
		Colors.light.primaryTextColor,
		Colors.dark.primaryTextColor
	);

	return (
		<Flex mt={setSize(Sizes.gap)}>
			<AvatarDisplay user={comment.creator} />
			<Flex flex={1} flexDir="column">
				{isEditing ? (
					<CommentEditor
						cid={comment.id}
						currentUser={currentUser!}
						post={post}
					/>
				) : (
					<Flex alignItems="center">
						<Flex
							bgColor={bgColor}
							borderRadius={setSize(Sizes.borderRadius)}
							mr={setSize(Sizes.gap / 2)}
							p={setSize(Sizes.gap / 2)}
							w="fit-content"
						>
							<Text color={color}>{comment.content}</Text>
						</Flex>
						<MoreMenu cid={comment.id} handleDelete={handleDelete} small />
					</Flex>
				)}
				<Flex fontSize="small" ml={setSize(Sizes.gap / 3)}>
					<Button
						fontSize="small"
						fontWeight="normal"
						minW="auto"
						onClick={toggleIsReplying}
						variant="link"
					>
						Reply
					</Button>
					<Flex as="span" mx={setSize(Sizes.gap / 4)}>
						·
					</Flex>
					<Flex as="span">{moment(comment.createdAt).fromNow()}</Flex>
				</Flex>
				<Replies
					comment={comment}
					currentUser={currentUser!}
					post={post}
				/>
			</Flex>
		</Flex>
	);
};
