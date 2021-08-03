import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IPost, IUser } from '../../../models';
import { usePostMutations } from '../../../services';
import { selectCurrentUser } from '../../../state/user';

export const useComposer = () => {
	const [bg, setBg] = useState<IPost['background']>(undefined);
	const [content, setContent] = useState<IPost['content']>({});
	const [isEditing, setIsEditing] = useState(false);

	const { createPost, errMsg } = usePostMutations();
	const [composeErrMsg, setComposeErrMsg] = useState(errMsg ?? ``);

	const currentUser = useSelector(selectCurrentUser);

	const handleBgChange = (value: string) => setBg(value);

	const handleCancel = () => {
		setBg(undefined);
		setContent({});
		setIsEditing(false);
	};

	const handleContentChange = (newContent: IPost['content']) =>
		setContent({ ...content, ...newContent });

	const handleSubmit = async () => {
		await createPost({
			background: bg,
			content,
			creator: currentUser as IUser,
		});
		setBg(undefined);
		setContent({});
	};

	return {
		bg,
		composeErrMsg,
		content,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleSubmit,
		isEditing,
		setComposeErrMsg,
	};
};
