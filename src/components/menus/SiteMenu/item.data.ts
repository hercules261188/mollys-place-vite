import { GoNote } from 'react-icons/go';
import { MdChildCare } from 'react-icons/md';
import { RiHomeHeartLine } from 'react-icons/ri';

import { IMenuItem } from '../types';

export const menuItems: IMenuItem[] = [
	{ icon: RiHomeHeartLine, id: 'home', label: 'Home', path: '/' },
	{
		icon: MdChildCare,
		id: 'grandkids',
		label: 'Grand Kids',
		path: '/grandkids',
	},
	{ icon: GoNote, id: 'recipes', label: 'Recipes', path: '/recipes' },
];
