import {
	ChangeEventHandler,
	KeyboardEventHandler,
	useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost, IUser, PostFilterTypes } from '../../../models';

import { retrieveVideoInfo, usePostMutations } from '../../../services';
import {
	selectPost,
	setPostBackground,
	setPostContent,
	setPostErrMsg,
	setPostFilter,
	setPostSubmission,
} from '../../../state/editor';
import {
	selectComposingImage,
	selectComposingRecipe,
	selectComposingVideo,
	selectEditingPost,
	toggleComposingImage,
	toggleComposingRecipe,
	toggleComposingVideo,
} from '../../../state/system';
import { selectUser } from '../../../state/user';
import { processImage } from './utilities';

export const useAddPost = () => {
	const dispatch = useDispatch();
	const { background, content, errMsg, filters, submission } =
		useSelector(selectPost);
	const { current: currentUser } = useSelector(selectUser);
	const isComposingImage = useSelector(selectComposingImage);
	const isComposingRecipe = useSelector(selectComposingRecipe);
	const isComposingVideo = useSelector(selectComposingVideo);
	const isEditingPost = useSelector(selectEditingPost);

	const { createPost, errMsg: errorMsg } = usePostMutations();

	useEffect(() => {
		if (errorMsg) dispatch(setPostErrMsg(errorMsg));
	}, [errorMsg, dispatch]);

	const _editorReset = () => {
		dispatch(setPostBackground(undefined));
		dispatch(setPostContent(undefined));
		isComposingImage && toggleImageSubmit();
		isComposingRecipe && toggleRecipeSubmit();
		isComposingVideo && toggleVideoSubmit();
	};

	const handleBgChange = (value: string) =>
		dispatch(setPostBackground(value));

	const handleCancel = () => _editorReset();

	const handleContentChange = (newContent: IPost['content']) =>
		dispatch(setPostContent(newContent));

	const handleFilterSelect: ChangeEventHandler<HTMLSelectElement> = e => {
		const filterKey =
			PostFilterTypes[
				e.target.value.toUpperCase() as keyof typeof PostFilterTypes
			];
		const newFilter = filterKey;
		dispatch(setPostFilter(newFilter));
	};

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
			filters,
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
				handleContentChange(response.success as IPost['content']);
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
	const toggleRecipeSubmit = () => dispatch(toggleComposingRecipe());
	const toggleVideoSubmit = () => dispatch(toggleComposingVideo());

	return {
		background,
		errMsg,
		content,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleFilterSelect,
		handleKeyPress,
		handleSubmission,
		handleSubmit,
		isComposingImage,
		isComposingRecipe,
		isComposingVideo,
		isEditingPost,
		processImage,
		submission,
		toggleImageSubmit,
		toggleRecipeSubmit,
		toggleVideoSubmit,
	};
};
