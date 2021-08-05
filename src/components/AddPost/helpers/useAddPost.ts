import {
	ChangeEventHandler,
	KeyboardEventHandler,
	useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost, IUser } from '../../../models';

import { retrieveVideoInfo, usePostMutations } from '../../../services';
import {
	selectPostBackground,
	selectPostContent,
	selectPostErrMsg,
	selectPostSubmission,
	setPostBackground,
	setPostContent,
	setPostErrMsg,
	setPostSubmission,
} from '../../../state/editor';
import {
	selectComposingImage,
	selectComposingVideo,
	selectEditingPost,
	toggleComposingImage,
	toggleComposingVideo,
	toggleEditingPost,
} from '../../../state/system';
import { selectCurrentUser } from '../../../state/user';
import { processImage } from './utilities';

export const useAddPost = () => {
	const dispatch = useDispatch();
	const background = useSelector(selectPostBackground);
	const content = useSelector(selectPostContent);
	const currentUser = useSelector(selectCurrentUser);
	const errMsg = useSelector(selectPostErrMsg);
	const isComposingImage = useSelector(selectComposingImage);
	const isComposingVideo = useSelector(selectComposingVideo);
	const isEditingPost = useSelector(selectEditingPost);
	const submission = useSelector(selectPostSubmission);

	const { createPost, errMsg: errorMsg } = usePostMutations();

	useEffect(() => {
		if (errorMsg) dispatch(setPostErrMsg(errorMsg));
	}, [errorMsg, dispatch]);

	const _editorReset = () => {
		dispatch(setPostBackground(undefined));
		dispatch(setPostContent(undefined));
	};

	const handleBgChange = (value: string) =>
		dispatch(setPostBackground(value));

	const handleCancel = () => _editorReset();

	const handleContentChange = (newContent: IPost['content']) =>
		dispatch(setPostContent(newContent));

	const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			getVideo();
		}
	};

	const handleSubmit = async () => {
		createPost({
			background,
			content,
			creator: currentUser as IUser,
		});
		_editorReset();
	};

	const handleSubmission: ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			getImage(e.target.files[0]);
		} else if (e.target.value) {
			dispatch(setPostSubmission(e.target.value));
		}
	};

	const getImage = async (image: File) => {
		if (image.name.match(/(i?)\.(jpe?g|png|gif)$/gi)) {
			const response = await processImage(image);

			if (response.failure) {
				dispatch(setPostErrMsg(response.failure));
			} else {
				dispatch(setPostErrMsg(''));
				handleContentChange(response.success);
			}
		} else {
			dispatch(setPostErrMsg('Invalid file type provided.'));
		}
	};

	const getVideo = async () => {
		const response = await retrieveVideoInfo(submission);

		if (response.failure) {
			dispatch(setPostErrMsg(response.failure));
		} else {
			dispatch(setPostErrMsg(''));
			handleContentChange(response.success);
			dispatch(setPostSubmission(''));
			toggleVideoSubmit();
		}
	};

	const toggleImageSubmit = () => dispatch(toggleComposingImage());
	const toggleVideoSubmit = () => dispatch(toggleComposingVideo());

	return {
		background,
		errMsg,
		content,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleKeyPress,
		handleSubmission,
		handleSubmit,
		isComposingImage,
		isComposingVideo,
		isEditingPost,
		submission,
		toggleImageSubmit,
		toggleVideoSubmit,
	};
};
