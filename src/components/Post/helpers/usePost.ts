import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPost } from '../../../models';
import { usePostMutations } from '../../../services';
import {
	selectPostBackground,
	selectPostContent,
	setPostBackground,
	setPostContent,
} from '../../../state/editor';
import {
	selectEditingPost,
	toggleEditingPost,
} from '../../../state/system';

export const usePost = (post?: IPost) => {
	const { deletePost, errMsg, updatePost } = usePostMutations();

	const background = useSelector(selectPostBackground);
	const content = useSelector(selectPostContent);
	const isEditingPost = useSelector(selectEditingPost);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post?.background) dispatch(setPostBackground(post.background));
		if (post?.content) dispatch(setPostContent(post.content));
	}, [dispatch, post]);

	const handleBgChange = (value: string) =>
		dispatch(setPostBackground(value));

	const handleCancel = () => {
		dispatch(setPostContent(undefined));
		dispatch(toggleEditingPost(``));
	};

	const handleContentChange = (newContent: IPost['content']) =>
		dispatch(setPostContent(newContent));

	const handleDelete = async (id: string) => await deletePost(id);

	const handleSubmit = async () => {
		await updatePost({
			background,
			content,
			post,
			update: !!isEditingPost,
		});

		toggleIsEditing();
		dispatch(setPostContent(undefined));
	};

	const toggleIsEditing = () =>
		dispatch(toggleEditingPost(isEditingPost ? `` : post!.id!));

	return {
		background,
		content,
		errMsg,
		isEditingPost,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleDelete,
		handleSubmit,
		toggleIsEditing,
	};
};
