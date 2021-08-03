import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPost, IPostComment, IPostReply } from '../../../models';
import { usePostMutations } from '../../../services';
import {
	selectEditingReply,
	selectReplying,
	toggleEditingReply,
	toggleReplying,
} from '../../../state/system';

interface IUseReply {
	cid: IPostComment['id'];
	creator: IPostComment['creator'];
	post: IPost;
	rid?: IPostReply['id'];
}

export const useReply = ({ cid, creator, post, rid }: IUseReply) => {
	const INITIAL_STATE = rid
		? post.comments![cid!].replies![rid].content
		: ``;
	const [content, setContent] =
		useState<IPostReply['content']>(INITIAL_STATE);

	const dispatch = useDispatch();
	const isEditing = useSelector(selectEditingReply);
	const isReplying = useSelector(selectReplying);

	const { errMsg, updatePost } = usePostMutations();

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e =>
		setContent(e.target.value);

	const handleDelete = async () =>
		updatePost({
			cid,
			post,
			rid,
		});

	const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> =
		e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleSubmit();
			}
		};

	const handleSubmit = async () => {
		updatePost({
			rid,
			cid,
			content,
			creator,
			post,
			update: !!isEditing,
		});

		setContent(``);
		rid && dispatch(toggleEditingReply(``));
	};

	const toggleIsEditing = () =>
		dispatch(toggleEditingReply(isEditing ? `` : rid!));

	const toggleIsReplying = () =>
		dispatch(toggleReplying(isReplying ? `` : cid!));

	return {
		content,
		errMsg,
		handleChange,
		handleDelete,
		handleKeyPress,
		handleSubmit,
		isEditing,
		isReplying,
		toggleIsEditing,
		toggleIsReplying,
	};
};
