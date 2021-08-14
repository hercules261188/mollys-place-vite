import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUserCredentials } from '../../models';
import { selectCurrentUser, setCurrentUser } from '../../state/user';
import { auth } from '../auth';
import { retrieveUser } from '../database';

export const useAuth = () => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
			if (firebaseUser) {
				const response = await retrieveUser({ id: firebaseUser.uid });

				if (response.failure) {
					setErrMsg(response.failure);
				} else {
					dispatch(setCurrentUser(response.success));
				}
			} else {
				dispatch(setCurrentUser(null));
			}
		});

		return () => {
			unsubscribe && unsubscribe();
		};
	}, [dispatch, history]);

	const signIn = async ({ email, password }: IUserCredentials) =>
		auth.signInWithEmailAndPassword(email, password);

	const signOut = async () => auth.signOut();

	return { currentUser, errMsg, signIn, signOut };
};
