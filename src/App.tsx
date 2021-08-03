import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useAuth } from './services';

import { HomePage, SignInPage } from './pages';

interface IComponentProps {}

export const App: React.FC<IComponentProps> = () => {
	useAuth();

	return (
		<Switch>
			<Route path="/signin">
				<SignInPage />
			</Route>
			<Route path="/">
				<HomePage />
			</Route>
		</Switch>
	);
};
