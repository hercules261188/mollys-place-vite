import {
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';

//
// Types...
type SystemSlice = {
	editing: {
		comment: string;
		post: string;
		reply: string;
	};
	replying: string;
};

//
// Initial state...
const initialState: SystemSlice = {
	editing: { comment: ``, post: ``, reply: `` },
	replying: ``,
};

//
// Reducer...
export const systemSlice = createSlice({
	initialState,
	name: `system`,
	reducers: {
		toggleEditingComment: (state, action: PayloadAction<string>) => {
			state.editing.comment = action.payload;
		},
		toggleEditingPost: (state, action: PayloadAction<string>) => {
			state.editing.post = action.payload;
		},
		toggleEditingReply: (state, action: PayloadAction<string>) => {
			state.editing.reply = action.payload;
		},
		toggleReplying: (state, action: PayloadAction<string>) => {
			state.replying = action.payload;
		},
	},
});

export const {
	toggleEditingComment,
	toggleEditingPost,
	toggleEditingReply,
	toggleReplying,
} = systemSlice.actions;
export const systemReducer = systemSlice.reducer;

//
// Selectors...
const _selectSystemSlice = (state: RootState): SystemSlice => state.system;

const _selectEditing = createSelector(
	[_selectSystemSlice],
	system => system.editing
);

export const selectEditingComment = createSelector(
	[_selectEditing],
	editing => editing.comment
);

export const selectEditingPost = createSelector(
	[_selectEditing],
	editing => editing.post
);

export const selectEditingReply = createSelector(
	[_selectEditing],
	editing => editing.reply
);

export const selectReplying = createSelector(
	[_selectSystemSlice],
	system => system.replying
);
