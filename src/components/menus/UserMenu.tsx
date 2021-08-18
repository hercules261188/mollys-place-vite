import {
	Avatar,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { signOut } from '../../services';
import { selectUser } from '../../state/user';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

interface IComponentProps {}

export const UserMenu: React.FC<IComponentProps> = () => {
	const switchText = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const { toggleColorMode } = useColorMode();

	const { current: currentUser } = useSelector(selectUser);
	const history = useHistory();

	const handleLogIn = () => history.push(`/signin`);

	const handleLogOut = async () => {
		await signOut();
		history.go(0);
	};

	return (
		<>
			{currentUser ? (
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="user menu"
						borderRadius="50%"
						h={setSize(2)}
						icon={
							<Avatar
								h={setSize(1.889)}
								name={currentUser.name}
								src={currentUser.image}
								w={setSize(1.889)}
							/>
						}
						minW="auto"
						variant="outline"
						w={setSize(2)}
					/>
					<MenuList p={setSize(Sizes.gap / 2)}>
						<MenuItem
							icon={<SwitchIcon />}
							onClick={toggleColorMode}
							textTransform="capitalize"
						>
							{`${switchText} mode`}
						</MenuItem>
						<MenuDivider />
						<MenuItem
							icon={<Icon as={FiLogOut} />}
							onClick={handleLogOut}
							textTransform="capitalize"
						>
							log out
						</MenuItem>
					</MenuList>
				</Menu>
			) : (
				<>
					<IconButton
						aria-label="log in"
						color={Colors.dark.primaryTextColor}
						icon={<Icon as={FiLogIn} />}
						onClick={handleLogIn}
						variant="outline"
					/>
					<ColorModeSwitcher />
				</>
			)}
		</>
	);
};
