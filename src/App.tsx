import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components';

import {
	GamingPage,
	HomePage,
	KidsPage,
	RecipePage,
	SignInPage,
} from './pages';

import { useAuth } from './services';

interface IComponentProps {}

export const App: React.FC<IComponentProps> = () => {
	const { loading, signOut } = useAuth();

	return loading ? (
		<Spinner />
	) : (
		<Layout signOut={signOut}>
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
					<SignInPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Layout>
	);
};
