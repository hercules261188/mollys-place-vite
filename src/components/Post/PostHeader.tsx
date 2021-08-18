import { Avatar, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FiGlobe, FiUsers } from 'react-icons/fi';

import { setSize } from '../../helpers';
import { IPost, IUser } from '../../models';
import { Colors, Sizes } from '../../constants';
import { MoreMenu } from '../menus/MoreMenu';
import { useSelector } from 'react-redux';
import { selectUser } from '../../state/user';

interface IComponentProps {
	createdAt: IPost['createdAt'];
	creator: IUser;
	filters: IPost['filters'];
	handleDelete: (id: string) => void;
	pid: IPost['id'];
}

export const PostHeader: React.FC<IComponentProps> = ({
	createdAt,
	creator,
	filters,
	handleDelete,
	pid,
}) => {
	const { current: currentUser } = useSelector(selectUser);
	const isOwner = creator.id === currentUser?.id;

	const VisibilityIcon = filters.public ? FiGlobe : FiUsers;
	const visibilityLabel = filters.public
		? `public post`
		: `users only post`;

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
							aria-label={visibilityLabel}
							icon={
								<Icon
									as={VisibilityIcon}
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
			{isOwner && <MoreMenu handleDelete={handleDelete} pid={pid} />}
		</Flex>
	);
};
