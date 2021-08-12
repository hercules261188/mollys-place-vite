import { db } from '../init';

import { IPost } from '../../../models';

export interface IPostsResponse {
	failure?: string;
	success?: {
		isEnd: boolean;
		lastDoc: number;
		posts: IPost[];
	};
}

const collectionRef = db.collection('posts');

export const retrievePosts = async (cursor: number | null) => {
	let isEnd = false;
	const numberToRetrieve = 6;
	const response = {} as IPostsResponse;
	const posts: IPost[] = [];

	try {
		const query = cursor
			? collectionRef
					.orderBy('createdAt', 'desc')
					.startAfter(cursor)
					.limit(numberToRetrieve)
			: collectionRef.orderBy('createdAt', 'desc').limit(numberToRetrieve);

		const snapshot = await query.get();

		console.log(snapshot.docs.length);

		isEnd = snapshot.docs.length < numberToRetrieve;
		const lastDoc = snapshot.docs[snapshot.docs.length - 1].data()
			.createdAt as IPost['createdAt'];

		snapshot.forEach(doc =>
			posts.push({ id: doc.id, ...doc.data() } as IPost)
		);

		response.success = { isEnd, lastDoc, posts };
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};
