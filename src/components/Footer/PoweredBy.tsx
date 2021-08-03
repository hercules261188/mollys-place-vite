import { Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../helpers';
import { ReactLogo } from '../logos';

interface IComponentProps {}

export const PoweredBy: React.FC<IComponentProps> = () => (
	<Flex alignItems="center" lineHeight={1.2}>
		<Text textAlign="center">Powered by</Text>
		<Link
			_hover={{ color: `#0cc6f8` }}
			alignItems="center"
			color="#61DAFB"
			display="flex"
			flexDir="row"
			href="https://reactjs.com/"
			isExternal
		>
			<ReactLogo h={setSize(2)} w={setSize(2)} />
			<Text>React</Text>
		</Link>
	</Flex>
);
