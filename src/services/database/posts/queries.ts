import { db } from '../init';

import { IPost } from '../../../models';

export interface IPostsResponse {
	failure?: string;
	success?: IPost[];
}

const collectionRef = db.collection('posts');

export const retrievePosts = async () => {
	const response = {} as IPostsResponse;
	const posts: IPost[] = [];

	try {
		const snapshot = await collectionRef
			.orderBy('createdAt', 'desc')
			.get();
		snapshot.forEach(doc =>
			posts.push({ id: doc.id, ...doc.data() } as IPost)
		);

		response.success = posts;
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};
