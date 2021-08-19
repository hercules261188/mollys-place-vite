import firebase from 'firebase';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { auth } from './services';
import { selectUser, setLoading, setUser } from './state/user';

import { Layout, Loading } from './components';

import {
	AboutPage,
	GamingPage,
	HomePage,
	KidsPage,
	RecipePage,
	SignInPage,
} from './pages';
import { resetPostsSlice } from './state/posts';
import { selectBanners, setBanners } from './state/banners';

interface IComponentProps {}

export const App: React.FC<IComponentProps> = () => {
	const {
		error: bannerError,
		list: bannersList,
		loading: loadingBanners,
	} = useSelector(selectBanners);
	const {
		current: currentUser,
		error: userError,
		loading: loadingUser,
	} = useSelector(selectUser);
	const dispatch = useDispatch();

	const loading = loadingBanners && loadingUser;

	React.useEffect(() => {
		const getBanners = () =>
			new Promise(resolve => {
				resolve(dispatch(setBanners()));
			});
		const getUser = () =>
			new Promise(resolve => {
				const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
					unsubscribe();
					resolve(firebaseUser);
				});
			});

		const init = async () => {
			await getBanners();
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
				<Route path="/about">
					<AboutPage banner={bannersList.about} />
				</Route>
				<Route path="/gaming">
					<GamingPage banner={bannersList.gaming} />
				</Route>
				<Route path="/grandkids">
					<KidsPage banner={bannersList.kids} />
				</Route>
				<Route path="/recipes">
					<RecipePage banner={bannersList.recipe} />
				</Route>
				<Route path="/signin">
					{currentUser ? (
						<Redirect to="/" />
					) : (
						<SignInPage banner={bannersList.signIn} />
					)}
				</Route>
				<Route path="/">
					<HomePage banner={bannersList.home} />
				</Route>
			</Switch>
		</Layout>
	);
};
