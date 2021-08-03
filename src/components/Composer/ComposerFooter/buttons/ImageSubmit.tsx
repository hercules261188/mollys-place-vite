import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiImage } from 'react-icons/fi';

import { SelectionStateTypes } from '..';
import { setSize } from '../../../../helpers';
import { Sizes } from '../../../../constants';

interface IComponentProps {
	toggleIsOpen: (type: SelectionStateTypes) => void;
}

export const ImageSubmit: React.FC<IComponentProps> = ({
	toggleIsOpen,
}) => {
	return (
		<Button
			alignItems="center"
			leftIcon={
				<Icon as={FiImage} h={setSize(1.333)} w={setSize(1.333)} />
			}
			letterSpacing="wider"
			onClick={() => toggleIsOpen(SelectionStateTypes.image)}
			mr={setSize(Sizes.gap)}
			variant="outline"
		>
			Image
		</Button>
	);
};
