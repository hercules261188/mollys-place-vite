import { SerializedError } from '@reduxjs/toolkit';

import { db } from '../init';

import { IBanner } from '../../../models';
import { IUpdateBanner } from '../../../state/banners';

const collectionRef = db.collection('banners');

export interface IBannerResponse {
	failure: SerializedError | null;
	success: {
		banner: IBanner;
		id: string;
	};
}

export const updateBanner = async ({ banner, id }: IUpdateBanner) => {
	const documentRef = collectionRef.doc(id);
	const response = {} as IBannerResponse;

	try {
		await documentRef.update(banner);
		response.success = { banner, id };
	} catch (error) {
		response.failure = error;
	}

	return response;
};
