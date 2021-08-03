import { Flex, Input } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../../helpers';
import { IPost } from '../../../models';
import { retrieveVideoInfo } from '../../../services';
import { Colors, Sizes } from '../../../constants';

import { ImageSubmit, PostSubmit, VideoSubmit } from './buttons';
import { processImage } from '../helpers';

interface IComponentProps {
	handleContentChange: (newContent: IPost['content']) => void;
	handleSubmit: () => void;
	setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}

export enum SelectionStateTypes {
	image = 'image',
	video = 'video',
}

type SelectionState = {
	[key in SelectionStateTypes]?: boolean;
};

const INITIAL_SELECTION_STATE = {
	image: false,
	video: false,
};

export const ComposerFooter: React.FC<IComponentProps> = ({
	handleContentChange,
	handleSubmit,
	setErrMsg,
}) => {
	const [isOpen, setIsOpen] = React.useState<SelectionState>(
		INITIAL_SELECTION_STATE
	);
	const [submission, setSubmission] = React.useState('');
	const openImageSelectRef = React.useRef<HTMLInputElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			getImage(e.target.files[0]);
		} else if (e.target.value) {
			setSubmission(e.target.value);
		}
	};

	const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> =
		e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				getVideo();
			}
		};

	const getImage = async (image: File) => {
		if (image.name.match(/(i?)\.(jpe?g|png|gif)$/gi)) {
			const response = await processImage(image);

			if (response.failure) {
				setErrMsg(response.failure);
			} else {
				setErrMsg('');
				handleContentChange(response.success);
			}
		} else {
			setErrMsg('Invalid file type provided.');
		}
	};

	const getVideo = async () => {
		const response = await retrieveVideoInfo(submission);

		if (response.failure) {
			setErrMsg(response.failure);
		} else {
			setErrMsg('');
			handleContentChange(response.success);
			setSubmission('');
			setIsOpen({ video: false });
		}
	};

	React.useEffect(() => {
		isOpen.image &&
			openImageSelectRef.current &&
			openImageSelectRef.current.click();
	}, [isOpen.image]);

	const toggleIsOpen = (type: SelectionStateTypes) => {
		setIsOpen({ [type]: !isOpen[type] });
	};

	return (
		<Flex
			borderBottomRadius={setSize(Sizes.borderRadius)}
			bgGradient={Colors.gradient}
			color="whiteAlpha.900"
			flexDir="column"
			minH={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			{isOpen && isOpen.video && (
				<Input
					accept="image/*"
					bg="white"
					color={Colors.light.primaryTextColor}
					mb={setSize(Sizes.gap)}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					value={submission}
				/>
			)}
			<Input
				display="none"
				onChange={handleChange}
				ref={openImageSelectRef}
				type="file"
			/>
			<Flex flex={1} justifyContent="space-between">
				<Flex>
					<ImageSubmit toggleIsOpen={toggleIsOpen} />
					<VideoSubmit toggleIsOpen={toggleIsOpen} />
				</Flex>
				<PostSubmit handleSubmit={handleSubmit} />
			</Flex>
		</Flex>
	);
};
