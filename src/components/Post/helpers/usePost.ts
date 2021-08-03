import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPost } from '../../../models';
import { usePostMutations } from '../../../services';
import {
	selectEditingPost,
	toggleEditingPost,
} from '../../../state/system';

interface IUsePost {
	post: IPost;
}

export const usePost = ({ post }: IUsePost) => {
	const { createPost, deletePost, errMsg, updatePost } =
		usePostMutations();

	const [bg, setBg] = useState(post.background || undefined);
	const [content, setContent] = useState<IPost['content']>(
		post.content || {}
	);

	const isEditing = useSelector(selectEditingPost);
	const dispatch = useDispatch();

	const handleBgChange = (value: string) => setBg(value);

	const handleContentChange = (newContent: IPost['content']) =>
		setContent({ ...content, ...newContent });

	const handleDelete = async () => await deletePost(post.id);

	const handleSubmit = async () => {
		await updatePost({
			background: bg,
			content,
			post,
			update: !!isEditing,
		});

		toggleIsEditing();
	};

	const toggleIsEditing = () =>
		dispatch(toggleEditingPost(isEditing ? `` : post.id!));

	return {
		bg,
		content,
		errMsg,
		isEditing,
		handleBgChange,
		handleContentChange,
		handleDelete,
		handleSubmit,
		toggleIsEditing,
	};
};
