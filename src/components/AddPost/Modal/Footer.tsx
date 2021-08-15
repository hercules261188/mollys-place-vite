import { Button, Flex, Input, Select } from '@chakra-ui/react';
import React from 'react';

import { Colors, Sizes } from '../../../constants';
import { setSize } from '../../../helpers';
import { useAddPost } from '../helpers';

import { Text } from '../../Text';

interface IComponentProps {
	onClose: () => void;
}

export const ModalFooter: React.FC<IComponentProps> = ({ onClose }) => {
	const {
		handleFilterSelect,
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
			<Flex flex={1} justifyContent="space-between">
				<Flex>
					<Select
						mr={setSize(Sizes.gap / 2)}
						onChange={handleFilterSelect}
						w="fit-content"
					>
						<option value="public">Public</option>
						<option value="user">User</option>
					</Select>
					<Select onChange={handleFilterSelect} w="fit-content">
						<option value="general">General</option>
						<option value="gaming">Gaming</option>
						<option value="kids">Grandkids</option>
						<option value="recipe">Recipe</option>
					</Select>
				</Flex>
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
