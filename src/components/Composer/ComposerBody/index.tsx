import { Flex } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../../helpers';
import { Sizes } from '../../../constants';

import { IPostEditorProps, PostEditor } from '../../PostEditor';

export const ComposerBody: React.FC<IPostEditorProps> = props => {
	return (
		<Flex
			bgColor={props.bg ? props.bg : 'white'}
			borderLeft="0.1rem solid #6B46C1"
			borderRight="0.1rem solid #6B46C1"
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			<PostEditor {...props} />
		</Flex>
	);
};
