import { SerializedError } from '@reduxjs/toolkit';

import { db } from '../init';

import { IBanners } from '../../../models';

const collectionRef = db.collection('banners');

export interface IBannersResponse {
	failure: SerializedError | null;
	success: IBanners | {};
}

export const retrieveBanners = async () => {
	let banners: IBanners = {};
	const response = {} as IBannersResponse;

	try {
		const snapshot = await collectionRef.get();

		snapshot.forEach(
			doc =>
				(banners = { ...banners, [doc.id]: { ...doc.data() } } as IBanners)
		);

		response.success = banners;
	} catch (error) {
		response.failure = error;
	}

	return response;
};
