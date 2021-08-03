import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPost, IPostComment } from '../../../models';
import { usePostMutations } from '../../../services';
import {
	selectEditingComment,
	selectReplying,
	toggleEditingComment,
	toggleReplying,
} from '../../../state/system';

interface IUseComment {
	cid?: IPostComment['id'];
	creator: IPostComment['creator'];
	post: IPost;
}

export const useComment = ({ cid, creator, post }: IUseComment) => {
	const INITIAL_STATE = cid ? post.comments![cid].content : ``;
	const [content, setContent] =
		useState<IPostComment['content']>(INITIAL_STATE);

	const dispatch = useDispatch();
	const isEditing = useSelector(selectEditingComment);
	const isReplying = useSelector(selectReplying);

	const { errMsg, updatePost } = usePostMutations();

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e =>
		setContent(e.target.value);

	const handleDelete = async () =>
		updatePost({
			cid,
			post,
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
			cid,
			content,
			creator,
			post,
			update: !!isEditing,
		});

		setContent(``);
		cid && dispatch(toggleEditingComment(``));
	};

	const toggleIsReplying = () =>
		dispatch(toggleReplying(isReplying ? `` : cid!));

	return {
		content,
		errMsg,
		handleChange,
		handleDelete,
		handleKeyPress,
		handleSubmit,
		toggleIsReplying,
	};
};
