import { Flex } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../../helpers';
import { Sizes } from '../../../constants';
import { useAddPost } from '../helpers';

import { PostEditor } from '../../PostEditor';

export const ModalBody: React.FC = () => {
	const { bg } = useAddPost();

	return (
		<Flex
			bgColor={bg ? bg : 'white'}
			borderLeft="0.1rem solid #6B46C1"
			borderRight="0.1rem solid #6B46C1"
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			<PostEditor />
		</Flex>
	);
};
