import {
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
	selected: string;
	toggleSelected: (value: string) => void;
}

export const AddPostModal: React.FC<IComponentProps> = ({
	selected,
	toggleSelected,
}) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		handleCancel,
		toggleImageSubmit,
		toggleRecipeSubmit,
		toggleVideoSubmit,
	} = useAddPost();

	React.useEffect(() => {
		if (selected === `image`) {
			onOpen();
			toggleImageSubmit();
		} else if (selected === `recipe`) {
			onOpen();
			toggleRecipeSubmit();
		} else if (selected === `text`) {
			onOpen();
		} else if (selected === `video`) {
			onOpen();
			toggleVideoSubmit();
		}
		toggleSelected(``);
	}, [selected]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW={setSize(34.764)} mx={setSize(Sizes.gap)}>
				<ModalHeader />
				<ModalCloseButton onClick={handleCancel} />
				<ModalBody />
				<ModalFooter onClose={onClose} />
			</ModalContent>
		</Modal>
	);
};
