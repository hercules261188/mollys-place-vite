import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, setPosts } from '../../state/posts';
import { retrievePosts } from '../database';

export const useRetrievePosts = () => {
	const [errMsg, setErrMsg] = useState('');

	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);

	useEffect(() => {
		(async () => {
			const response = await retrievePosts();
			if (response.failure) {
				setErrMsg(response.failure);
			} else {
				dispatch(setPosts(response.success!));
			}
		})();
	}, [dispatch]);

	return { errMsg, posts };
};
