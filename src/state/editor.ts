import {
	createSelector,
	createSlice,
	current,
	PayloadAction,
} from '@reduxjs/toolkit';
import { IPost, PostFilterTypes } from '../models';
import { RootState } from './store';

//
// Types...
type EditorSlice = {
	post: {
		background: string | undefined;
		content?: IPost['content'];
		errMsg: string;
		filters: IPost['filters'];
		submission: string;
	};
};

//
// Initial state...
const initialState: EditorSlice = {
	post: {
		background: undefined,
		content: undefined,
		errMsg: ``,
		filters: {
			[PostFilterTypes.PUBLIC]: true,
			[PostFilterTypes.GENERAL]: true,
		},
		submission: ``,
	},
};

//
// Reducer...
export const editorSlice = createSlice({
	initialState,
	name: `editor`,
	reducers: {
		setPostBackground: (
			state,
			action: PayloadAction<IPost['background']>
		) => {
			state.post.background = action.payload;
		},
		setPostContent: (
			state,
			action: PayloadAction<IPost['content'] | undefined>
		) => {
			if (action.payload) {
				state.post.content = state.post.content
					? { ...state.post.content, ...action.payload }
					: action.payload;
			} else {
				state.post = initialState.post;
			}
		},
		setPostErrMsg: (state, action: PayloadAction<string>) => {
			state.post.errMsg = action.payload;
		},
		setPostFilter: (state, action: PayloadAction<PostFilterTypes>) => {
			// Set section defaults...
			if (action.payload === PostFilterTypes.GAMING) {
				if (!state.post.filters.public) state.post.filters.public = true;
				if (!state.post.filters.user) state.post.filters.user = true;
				if (state.post.filters.kids) delete state.post.filters.kids;
				if (state.post.filters.recipe) delete state.post.filters.recipe;
			}
			if (action.payload === PostFilterTypes.GENERAL) {
				if (!state.post.filters.public) state.post.filters.public = true;
				if (!state.post.filters.user) state.post.filters.user = true;
				if (state.post.filters.gaming) delete state.post.filters.gaming;
				if (state.post.filters.kids) delete state.post.filters.kids;
				if (state.post.filters.recipe) delete state.post.filters.recipe;
			}
			if (action.payload === PostFilterTypes.KIDS) {
				if (state.post.filters.public) delete state.post.filters.public;
				if (!state.post.filters.user) state.post.filters.user = true;
				if (state.post.filters.gaming) delete state.post.filters.gaming;
				if (state.post.filters.recipe) delete state.post.filters.recipe;
			}
			if (action.payload === PostFilterTypes.RECIPE) {
				if (!state.post.filters.public) state.post.filters.public = true;
				if (!state.post.filters.user) state.post.filters.user = true;
				if (state.post.filters.kids) delete state.post.filters.kids;
				if (state.post.filters.gaming) delete state.post.filters.gaming;
			}

			// Adjust security levels...
			if (action.payload === PostFilterTypes.USER) {
				if (state.post.filters.public) delete state.post.filters.public;
			}

			state.post.filters = {
				...state.post.filters,
				[action.payload]: true,
			};
		},
		setPostSubmission: (state, action: PayloadAction<string>) => {
			state.post.submission = action.payload;
		},
	},
});

export const {
	setPostBackground,
	setPostContent,
	setPostErrMsg,
	setPostFilter,
	setPostSubmission,
} = editorSlice.actions;
export const editorReducer = editorSlice.reducer;

//
// Selectors...
const _selectEditorSlice = (state: RootState) => state.editor;

export const selectPost = createSelector(
	[_selectEditorSlice],
	editor => editor.post
);
