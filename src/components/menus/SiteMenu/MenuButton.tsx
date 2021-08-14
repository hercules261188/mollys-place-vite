import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Sizes } from '../../../constants';
import { setSize } from '../../../helpers';
import { IMenuItem } from './item.data';

import { Text } from '../../Text';

export const MenuButton: React.FC<IMenuItem> = ({ icon, label, path }) => {
	const history = useHistory();

	const handleClick = () => history.push(path);

	return (
		<Button
			alignItems="center"
			h={setSize(2.222)}
			justifyContent="flex-start"
			leftIcon={<Icon as={icon} mr={`${Sizes.gap / 2}rem`} />}
			mb={`${Sizes.gap / 2}rem`}
			onClick={handleClick}
			variant="ghost"
			w="100%"
		>
			<Text fontWeight="light" letterSpacing="wide">
				{label}
			</Text>
		</Button>
	);
};
