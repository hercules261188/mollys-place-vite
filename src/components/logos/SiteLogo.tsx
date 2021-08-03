import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Colors, Strings } from '../../constants';
import { setSize } from '../../helpers';

interface IComponentProps {
	large?: boolean;
}

export const SiteLogo: React.FC<IComponentProps> = ({ large }) => {
	const {
		site: { name },
	} = Strings;

	const color = useColorModeValue(
		Colors.light.primaryTextColor,
		Colors.dark.primaryTextColor
	);

	return (
		<Flex>
			<Link to="/">
				<Flex fontSize={large ? '2xl' : 'xl'}>
					<Text
						color={large ? Colors.dark.primaryTextColor : color}
						fontFamily="Great Vibes"
						lineHeight={1.2}
						mt={setSize(0.278)}
						pr={setSize(0.111)}
					>
						{name}
					</Text>
				</Flex>
			</Link>
		</Flex>
	);
};
