import {
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { IUser } from '../models';
import { RootState } from './store';

//
// Types...
type UserSlice = IUser | null;

//
// Initial state...
const initialState = null as UserSlice;

//
// Reducer...
export const userSlice = createSlice({
	initialState,
	name: `user`,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<UserSlice>) => {
			state = action.payload;

			return state;
		},
	},
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

//
// Selectors...
const _selectUserSlice = (state: RootState): UserSlice => state.user;

export const selectCurrentUser = createSelector(
	[_selectUserSlice],
	user => user
);
