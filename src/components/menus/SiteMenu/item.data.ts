import { IconType } from 'react-icons';
import { BiGame } from 'react-icons/bi';
import { GoNote } from 'react-icons/go';
import { MdChildCare } from 'react-icons/md';
import { RiHomeHeartLine } from 'react-icons/ri';

export interface IMenuItem {
	icon: IconType;
	id: string;
	label: string;
	path: string;
}

export const menuItems: IMenuItem[] = [
	{ icon: RiHomeHeartLine, id: 'home', label: 'Home', path: '/' },
	{
		icon: MdChildCare,
		id: 'grandkids',
		label: 'Grand Kids',
		path: '/grandkids',
	},
	{ icon: BiGame, id: 'gaming', label: 'Gaming', path: '/gaming' },
	{ icon: GoNote, id: 'recipes', label: 'Recipes', path: '/recipes' },
];
