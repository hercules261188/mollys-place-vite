import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';

import { IUsersResponse, retrieveUser } from '../services';
import { RootState } from './store';

//
// Types...
type UserSlice = {
	current: IUsersResponse['success'] | null;
	error: IUsersResponse['failure'];
	loading: boolean;
};

//
// Initial state...
const initialState: UserSlice = {
	current: null,
	error: null,
	loading: true,
};

//
// Thunk actions...
const setUser = createAsyncThunk(
	`user/setCurrentUser`,
	async (id: string | null) => {
		const response = id ? await retrieveUser({ id }) : null;
		return response;
	}
);
//
// Reducer...
export const userSlice = createSlice({
	initialState,
	name: `user`,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(setUser.pending, state => {
			state.loading = true;
		});
		builder.addCase(setUser.fulfilled, (state, action) => {
			if (!action.payload) {
				state.current = null;
			} else if (action.payload.failure) {
				state.error = action.payload.failure;
			} else {
				state.current = action.payload.success;
			}
			if (state.loading) state.loading = false;
		});
		builder.addCase(setUser.rejected, (state, action) => {
			if (state.loading) state.loading = false;
			state.error = action.error;
		});
	},
});

export { setUser };

export const userReducer = userSlice.reducer;

//
// Selectors...
const _selectUserSlice = (state: RootState): UserSlice => state.user;

export const selectUser = createSelector([_selectUserSlice], user => user);
