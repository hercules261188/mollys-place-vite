import { Icon, MenuItem, Text } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../helpers';
import { IMenuItem } from './types';

interface IComponentProps {
	handleCallback: () => void | Promise<void>;
	icon: IMenuItem['icon'];
	label: IMenuItem['label'];
}

export const CustomMenuItem: React.FC<IComponentProps> = ({
	handleCallback,
	icon,
	label,
}) => {
	return (
		<MenuItem
			h={setSize(2.222)}
			onClick={handleCallback}
			icon={<Icon as={icon} size={setSize(1.333)} />}
			variant="ghost"
			w="full"
		>
			<Text textAlign="end">{label}</Text>
		</MenuItem>
	);
};
