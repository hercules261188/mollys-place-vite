import firebase from 'firebase';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { auth } from './services';
import { selectUser, setLoading, setUser } from './state/user';

import { Layout, Loading } from './components';

import {
	GamingPage,
	HomePage,
	KidsPage,
	RecipePage,
	SignInPage,
} from './pages';
import { resetPostsSlice } from './state/posts';

interface IComponentProps {}

export const App: React.FC<IComponentProps> = () => {
	const { current: currentUser, error, loading } = useSelector(selectUser);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const getUser = () =>
			new Promise(resolve => {
				const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
					unsubscribe();
					resolve(firebaseUser);
				});
			});

		const init = async () => {
			const firebaseUser = (await getUser()) as firebase.User;

			if (firebaseUser) {
				dispatch(setUser(firebaseUser.uid));
			} else {
				dispatch(setLoading(false));
			}
			dispatch(resetPostsSlice());
		};

		init();
	}, []);

	return loading ? (
		<Loading />
	) : (
		<Layout>
			<Switch>
				<Route path="/gaming">
					<GamingPage />
				</Route>
				<Route path="/grandkids">
					<KidsPage />
				</Route>
				<Route path="/recipes">
					<RecipePage />
				</Route>
				<Route path="/signin">
					{currentUser ? <Redirect to="/" /> : <SignInPage />}
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Layout>
	);
};
