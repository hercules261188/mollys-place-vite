import { Avatar, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FiUsers } from 'react-icons/fi';

import { setSize } from '../../helpers';
import { IPost, IUser } from '../../models';
import { Colors, Sizes } from '../../constants';
import { MoreMenu } from '../menus/MoreMenu';

interface IComponentProps {
	createdAt: IPost['createdAt'];
	creator: IUser;
	handleDelete: (id: string) => void;
	pid: IPost['id'];
}

export const PostHeader: React.FC<IComponentProps> = ({
	createdAt,
	creator,
	handleDelete,
	pid,
}) => {
	return (
		<Flex
			bgGradient={Colors.gradient}
			borderTopRadius={setSize(Sizes.borderRadius)}
			h={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			<Avatar
				border="0.1rem solid white"
				name={creator.name}
				h={setSize(2.222)}
				mr={setSize(Sizes.gap / 2)}
				src={creator.image}
				w={setSize(2.222)}
			/>
			<Flex flex={1}>
				<Flex flexDir="column">
					<Text
						color={Colors.dark.primaryTextColor}
						fontWeight="bold"
						letterSpacing="wider"
						lineHeight={1}
					>
						{creator.name}
					</Text>
					<Flex alignItems="center" color={Colors.dark.secondaryTextColor}>
						<Text
							as="span"
							fontSize="0.8rem"
							fontWeight="hairline"
						>{`${moment(createdAt).fromNow()} · `}</Text>
						<IconButton
							aria-label="molly's friends"
							icon={
								<Icon
									as={FiUsers}
									color={Colors.dark.secondaryTextColor}
									h={setSize(0.8)}
									w={setSize(0.8)}
								/>
							}
							h={setSize(1)}
							ml={setSize(0.111)}
							minW="auto"
							w={setSize(1)}
							variant="ghost"
						/>
					</Flex>
				</Flex>
			</Flex>
			<MoreMenu handleDelete={handleDelete} pid={pid} />
		</Flex>
	);
};
