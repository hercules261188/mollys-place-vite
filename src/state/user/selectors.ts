import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { UserSlice } from './types';

const _selectUserSlice = (state: RootState): UserSlice => state.user;

export const selectCurrentUser = createSelector(
	[_selectUserSlice],
	user => user
);
