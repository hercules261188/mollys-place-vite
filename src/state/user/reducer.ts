import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

import { UserSlice } from './types';

export const userSlice = createSlice({
	initialState,
	name: `user`,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<UserSlice>) =>
			(state = action.payload),
	},
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
