import Resizer from 'react-image-file-resizer';

import { IPost } from '../../../models';

interface IProcessImageResponse {
	failure: string;
	success: IPost['content'];
}

interface IImageDimensions {
	height: number;
	width: number;
}

const getImageDimensions = (image: File) => {
	const dimensions = {} as IImageDimensions;
	const imageUrl = URL.createObjectURL(image);
	const img = new Image();
	img.onload = () => {
		dimensions.height = img.height;
		dimensions.width = img.width;
		URL.revokeObjectURL(img.src);
	};
	img.src = imageUrl;

	return dimensions;
};

const resizeImage = (image: File) =>
	new Promise(resolve => {
		Resizer.imageFileResizer(
			image,
			700,
			700,
			'WEBP',
			90,
			0,
			uri => {
				resolve(uri as File);
			},
			'file'
		);
	}) as Promise<File>;

const readFileAsync = async (image: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject;

		reader.readAsDataURL(image);
	});

export const processImage = async (image: File) => {
	const response = {} as IProcessImageResponse;
	try {
		const resizedImage = await resizeImage(image);

		const imageData = (await readFileAsync(resizedImage)) as string;

		const imageDimensions = getImageDimensions(resizedImage);

		response.success = {
			image: {
				data: imageData,
				dimensions: imageDimensions,
				name: resizedImage.name.toLowerCase().split(/\.(?=[^\.]+$)/g)[0],
			},
		};
	} catch (error) {
		response.failure = error.message;
	}

	return response;
};
