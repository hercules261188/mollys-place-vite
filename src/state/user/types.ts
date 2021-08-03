import { IUser } from '../../models';

export enum UserActionTypes {
	SET_CURRENT_USER = `user/setCurrentUser`,
}

export type UserSlice = IUser | null;
