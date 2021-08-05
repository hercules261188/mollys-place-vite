import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';

import { AddPostModal } from './Modal';

interface IComponentProps {}

export const AddPostButton: React.FC<IComponentProps> = () => {
	const types = [`image`, `recipe`, `text`, `video`];

	return (
		<Menu>
			<MenuButton
				_active={{ bgGradient: Colors.gradient }}
				_hover={{ bgGradient: Colors.gradient }}
				as={IconButton}
				aria-label="add post"
				bgGradient={Colors.gradient}
				borderRadius="50%"
				bottom={3}
				icon={<Icon as={FiPlus} />}
				position="fixed"
				right={3}
				zIndex={1}
			/>
			<MenuList p={setSize(Sizes.gap)}>
				{types.map(type => (
					<AddPostModal key={type} type={type} />
				))}
			</MenuList>
		</Menu>
	);
};
