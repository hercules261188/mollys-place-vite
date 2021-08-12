import {
	createAsyncThunk,
	createSelector,
	createSlice,
	current,
	PayloadAction,
	SerializedError,
} from '@reduxjs/toolkit';

import { IPost } from '../models';
import { retrievePosts } from '../services';
import { RootState } from './store';

//
// Types...
type PostsSlice = {
	error: SerializedError | null;
	isEnd: boolean;
	lastDoc: IPost['createdAt'] | null;
	list: IPost[];
	loading: boolean;
};

//
// Initial state...
const initialState: PostsSlice = {
	error: null,
	isEnd: false,
	lastDoc: null,
	list: [],
	loading: false,
};

//
// Thunk actions...
const setPosts = createAsyncThunk(
	'posts/setPosts',
	async (lastDoc: PostsSlice['lastDoc']) => {
		const response = await retrievePosts(lastDoc);
		return response;
	}
);

//
// Reducer...
export const postsSlice = createSlice({
	initialState,
	name: `posts`,
	reducers: {
		addPost: (state, action: PayloadAction<IPost>) => {
			state.list =
				current(state.list).length === 0
					? [action.payload]
					: [action.payload, ...state.list];

			return state;
		},
		removePost: (state, action: PayloadAction<IPost['id']>) => {
			state.list = state.list.filter(
				(post: IPost) => post.id !== action.payload
			);

			return state;
		},
		updatePost: (state, action: PayloadAction<IPost>) => {
			state.list = state.list.map((post: IPost) =>
				post.id === action.payload.id ? action.payload : post
			);

			return state;
		},
	},
	extraReducers: builder => {
		builder.addCase(setPosts.pending, state => {
			if (!state.loading) state.loading = true;
		});
		builder.addCase(setPosts.fulfilled, (state, action) => {
			if (state.loading) state.loading = false;
			if (action.payload.success) {
				const { success } = action.payload;
				state.list.push(...success.posts);
				state.lastDoc = success.lastDoc;
				if (success.isEnd) {
					state.isEnd = true;
				}
			}
		});
		builder.addCase(setPosts.rejected, (state, action) => {
			if (state.loading) state.loading = false;
			state.error = action.error;
		});
	},
});

export const { addPost, removePost, updatePost } = postsSlice.actions;
export { setPosts };
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
		posts => posts.list.filter(post => post.id === pid)[0]
	);
