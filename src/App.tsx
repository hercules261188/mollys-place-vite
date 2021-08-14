import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useAuth } from './services';

import {
	GamingPage,
	HomePage,
	KidsPage,
	RecipePage,
	SignInPage,
} from './pages';

interface IComponentProps {}

export const App: React.FC<IComponentProps> = () => {
	useAuth();

	return (
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
	);
};
