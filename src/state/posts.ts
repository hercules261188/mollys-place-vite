import {
	createSelector,
	createSlice,
	current,
	PayloadAction,
} from '@reduxjs/toolkit';

import { IPost } from '../models';
import { RootState } from './store';

//
// Types...
type PostsSlice = IPost[];

//
// Initial state...
const initialState: PostsSlice = [];

//
// Reducer...
export const postsSlice = createSlice({
	initialState,
	name: `posts`,
	reducers: {
		addPost: (state, action: PayloadAction<IPost>) => {
			state =
				current(state).length === 0
					? [action.payload]
					: [action.payload, ...state];

			return state;
		},
		removePost: (state, action: PayloadAction<IPost['id']>) => {
			state = state.filter((post: IPost) => post.id !== action.payload);

			return state;
		},
		setPosts: (state, action: PayloadAction<PostsSlice>) => {
			return current(state).length === 0
				? action.payload
				: [...action.payload, ...state];
		},
		updatePost: (state, action: PayloadAction<IPost>) => {
			return state.map((post: IPost) =>
				post.id === action.payload.id ? action.payload : post
			);
		},
	},
});

export const { addPost, removePost, setPosts, updatePost } =
	postsSlice.actions;
export const postsReducer = postsSlice.reducer;

//
// Selectors...
const _selectPostsSlice = (state: RootState): PostsSlice => state.posts;

export const selectPosts = createSelector(
	[_selectPostsSlice],
	posts => posts
);

export const selectPostById = (pid: IPost['id']) =>
	createSelector(
		[_selectPostsSlice],
		posts => posts.filter(post => post.id === pid)[0]
	);
