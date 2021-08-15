import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUserCredentials } from '../../models';
import { selectUser, setUser } from '../../state/user';
import { auth } from '../auth';

export const useAuth = () => {
	const { current: currentUser, error, loading } = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
			if (!loading && !firebaseUser && currentUser) {
				// User logged out...
				console.log(`User logged out.`);
				dispatch(setUser(null));
			} else if (!loading && firebaseUser && currentUser) {
				// Different user...
				console.log(`Different user.`);
				const differentUser = firebaseUser.uid !== currentUser.id;
				differentUser && dispatch(setUser(firebaseUser.uid));
			} else if (firebaseUser && !currentUser) {
				// New login...
				console.log(`New login.`);
				dispatch(setUser(firebaseUser.uid));
			}
		});

		return () => {
			unsubscribe && unsubscribe();
		};
	}, [dispatch]);

	const signIn = async ({ email, password }: IUserCredentials) =>
		auth.signInWithEmailAndPassword(email, password);

	const signOut = async () => auth.signOut();

	return { currentUser, errMsg: error, loading, signIn, signOut };
};
