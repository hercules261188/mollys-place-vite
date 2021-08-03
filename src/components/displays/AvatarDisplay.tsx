import { Avatar } from '@chakra-ui/react';
import React from 'react';

import { setSize } from '../../helpers';
import { IUser } from '../../models';
import { Sizes } from '../../constants';

interface IComponentProps {
	user: IUser;
}

export const AvatarDisplay: React.FC<IComponentProps> = ({ user }) => (
	<Avatar
		border="0.1rem solid white"
		name={user.name}
		h={setSize(2.222)}
		mr={setSize(Sizes.gap / 2)}
		src={user.image}
		w={setSize(2.222)}
	/>
);
