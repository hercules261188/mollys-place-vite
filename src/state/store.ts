import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './posts';
import { systemReducer } from './system';
import { userReducer } from './user';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		system: systemReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
