import { Flex } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useComment } from './helpers';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { IPost, IUser } from '../../models';

interface IComponentProps {
	cid?: string;
	currentUser: IUser;
	post: IPost;
}

export const CommentEditor: React.FC<IComponentProps> = ({
	cid,
	currentUser,
	post,
}) => {
	const { content, errMsg, handleChange, handleKeyPress } = useComment({
		cid,
		creator: currentUser,
		post,
	});
	errMsg && console.error(errMsg);

	return (
		<Flex
			alignItems="center"
			bgColor="white"
			borderRadius={setSize(Sizes.borderRadius * 1.5)}
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 3)}
			position="relative"
		>
			<TextareaAutosize
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				style={{
					color: 'black',
					outline: 'none',
					overflow: 'hidden',
					width: '100%',
				}}
				value={content}
			/>
		</Flex>
	);
};
