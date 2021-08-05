import {
	MenuItem,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Sizes } from '../../../constants';
import { setSize } from '../../../helpers';
import { useAddPost } from '../helpers';
import { ModalBody } from './Body';
import { ModalFooter } from './Footer';
import { ModalHeader } from './Header';

interface IComponentProps {
	type: string;
}

export const AddPostModal: React.FC<IComponentProps> = ({ type }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { toggleImageSubmit, toggleVideoSubmit } = useAddPost();

	const handleClick = (type: string) => {
		if (type === `image`) {
			onOpen();
			toggleImageSubmit();
		} else if (type === `recipe`) {
		} else if (type === `text`) {
		} else if (type === `video`) {
			onOpen();
			toggleVideoSubmit();
		}
	};

	return (
		<>
			<MenuItem
				onClick={() => handleClick(type)}
				textTransform="capitalize"
			>
				{`add ${type} post`}
			</MenuItem>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxW={setSize(34.764)} mx={setSize(Sizes.gap)}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody />
					<ModalFooter onClose={onClose} />
				</ModalContent>
			</Modal>
		</>
	);
};
