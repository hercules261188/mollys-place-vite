import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiYoutube } from 'react-icons/fi';

import { SelectionStateTypes } from '..';
import { setSize } from '../../../../helpers';

interface IComponentProps {
	toggleIsOpen: (type: SelectionStateTypes) => void;
}

export const VideoSubmit: React.FC<IComponentProps> = ({
	toggleIsOpen,
}) => {
	return (
		<Button
			alignItems="center"
			leftIcon={
				<Icon as={FiYoutube} h={setSize(1.333)} w={setSize(1.333)} />
			}
			letterSpacing="wider"
			onClick={() => toggleIsOpen(SelectionStateTypes.video)}
			variant="outline"
		>
			Video
		</Button>
	);
};
