import { Flex } from '@chakra-ui/react';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { setSize } from '../../helpers';
import { IPost, IPostComment, IPostReply, IUser } from '../../models';
import { Sizes } from '../../constants';
import { useReply } from './helpers';

interface IComponentProps {
	cid: IPostComment['id'];
	currentUser: IUser;
	post: IPost;
	rid?: IPostReply['id'];
}

export const ReplyEditor: React.FC<IComponentProps> = ({
	cid,
	currentUser,
	post,
	rid,
}) => {
	const { content, handleChange, handleKeyPress } = useReply({
		cid,
		creator: currentUser,
		post,
		rid,
	});

	return (
		<Flex
			alignItems="center"
			bgColor="white"
			borderRadius={setSize(Sizes.borderRadius * 1.5)}
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 3)}
			position="relative"
			w="full"
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
