import { Flex, Icon, IconButton, Input } from '@chakra-ui/react';
import React from 'react';
import { FiCamera } from 'react-icons/fi';

import { Colors } from '../../constants';
import { IBanner } from '../../models';
import { processImage } from './helpers';

interface IComponentProps {
	setPreview: React.Dispatch<React.SetStateAction<{} | IBanner>>;
}

export const ChangeImage: React.FC<IComponentProps> = ({ setPreview }) => {
	const [errMsg, setErrMsg] = React.useState(``);
	errMsg && console.log(`BannerImage.ChangeImage.errMsg: ${errMsg}`);
	const [image, setImage] = React.useState<File | null>(null);

	const imageInputRef = React.useRef<HTMLInputElement>(null);

	const getPreview = async (image: File) => {
		const processedImage = await processImage(image);
		if (processedImage.failure) {
			setErrMsg(processedImage.failure);
		} else {
			setPreview(processedImage.success);
		}
	};

	const handleClick = () => imageInputRef.current?.click();

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
		async e => setImage(e.target.files ? e.target.files[0] : null);

	React.useEffect(() => {
		image && getPreview(image);
	}, [image]);

	return (
		<Flex>
			<IconButton
				aria-label="change image"
				bottom={0}
				color={Colors.dark.primaryTextColor}
				icon={<Icon as={FiCamera} />}
				onClick={handleClick}
				position="absolute"
				right={0}
				variant="ghost"
			/>
			<Input
				accept="image/*"
				display="none"
				onChange={handleFileChange}
				ref={imageInputRef}
				type="file"
			/>
		</Flex>
	);
};
