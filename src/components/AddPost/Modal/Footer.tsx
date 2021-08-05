import { Button, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { Colors, Sizes } from '../../../constants';
import { setSize } from '../../../helpers';
import { Text } from '../../Text';

import { useAddPost } from '../helpers';

interface IComponentProps {
	onClose: () => void;
}

export const ModalFooter: React.FC<IComponentProps> = ({ onClose }) => {
	const {
		handleKeyPress,
		handleSubmission,
		handleSubmit,
		isComposingImage,
		isComposingVideo,
		submission,
	} = useAddPost();
	const openImageSelectRef = React.useRef<HTMLInputElement>(null);

	const handlePostSubmit = () => {
		handleSubmit();
		onClose();
	};

	React.useEffect(() => {
		isComposingImage &&
			!submission &&
			openImageSelectRef.current &&
			openImageSelectRef.current.click();
	}, [isComposingImage]);

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
			{isComposingVideo && (
				<Flex flexDir="column">
					<Text>Enter the YouTube video link...</Text>
					<Input
						accept="image/*"
						bg="white"
						color={Colors.light.primaryTextColor}
						mb={setSize(Sizes.gap)}
						onChange={handleSubmission}
						onKeyPress={handleKeyPress}
						value={submission}
					/>
				</Flex>
			)}
			<Input
				display="none"
				onChange={handleSubmission}
				ref={openImageSelectRef}
				type="file"
				zIndex={50}
			/>
			<Flex flex={1} justifyContent="flex-end">
				<Button
					letterSpacing="wider"
					onClick={handlePostSubmit}
					variant="outline"
				>
					POST
				</Button>
			</Flex>
		</Flex>
	);
};
