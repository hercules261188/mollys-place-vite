import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { useComposer } from './helpers';

import { ComposerBody } from './ComposerBody';
import { ComposerFooter } from './ComposerFooter';
import { ComposerHeader } from './ComposerHeader';

interface IComponentProps {}

export const Composer: React.FC<IComponentProps> = () => {
	const {
		bg,
		composeErrMsg,
		content,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleSubmit,
		isEditing,
		setComposeErrMsg,
	} = useComposer();

	return (
		<Flex flexDir="column" mt={setSize(Sizes.gap)} w="full">
			<ComposerHeader handleCancel={handleCancel} />
			<ComposerBody
				bg={bg}
				errMsg={composeErrMsg}
				handleBgChange={handleBgChange}
				handleCancel={handleCancel}
				handleContentChange={handleContentChange}
				handleSubmit={handleSubmit}
				isEditing={isEditing}
				preview={content.image || content.video ? content : undefined}
				text={content.text}
			/>
			<ComposerFooter
				handleContentChange={handleContentChange}
				handleSubmit={handleSubmit}
				setErrMsg={setComposeErrMsg}
			/>
		</Flex>
	);
};
