import firebase from 'firebase';

import { db } from '../init';

import { IPost, PostFilters } from '../../../models';

export interface IPostsResponse {
	failure?: string;
	success?: {
		cursor: number;
		isEnd: boolean;
		posts: IPost[];
	};
}

const collectionRef = db.collection('posts');

export interface IRetrievePosts {
	cursor: number | null;
	filter: PostFilters | null;
	isAuthed: boolean;
}

export const retrievePosts = async ({
	cursor,
	filter,
	isAuthed,
}: IRetrievePosts) => {
	let isEnd = false;
	const numberToRetrieve = 6;
	const response = {} as IPostsResponse;
	const posts: IPost[] = [];

	isAuthed = true;
	console.log(`isAuthed: ${isAuthed}`);
	console.log(`Filter: ${filter}`);

	const authFilter = isAuthed ? PostFilters.USER : PostFilters.PUBLIC;

	// Construct query...
	let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
	if (cursor) {
		console.log(`Cursor: ${cursor}`);
		query = collectionRef.where(authFilter, `==`, true);
		query = filter ? query.where(filter, `==`, true) : query;
		query = query.orderBy('createdAt', 'desc');
		query = query.startAfter(cursor);
	} else {
		query = collectionRef.where(authFilter, `==`, true);
		query = filter ? query.where(filter, `==`, true) : query;
		query = query.orderBy('createdAt', 'desc');
	}

	query = query.limit(numberToRetrieve);

	try {
		const snapshot = await query.get();

		console.log(`Returned: ${snapshot.docs.length}`);

		isEnd = snapshot.docs.length < numberToRetrieve;
		const cursor = snapshot.docs[snapshot.docs.length - 1].data()
			.createdAt as IPost['createdAt'];

		snapshot.forEach(doc =>
			posts.push({ id: doc.id, ...doc.data() } as IPost)
		);

		posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

		response.success = { cursor, isEnd, posts };
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};
