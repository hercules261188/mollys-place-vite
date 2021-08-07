import { Flex, Icon, IconButton, Image, Input } from '@chakra-ui/react';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { Text } from '../Text';

interface IComponentProps {}

export const ImageBox: React.FC<IComponentProps> = () => {
	const [image, setImage] = React.useState<File | null>(null);
	const [preview, setPreview] = React.useState<string | null>(null);

	const imageInputRef = React.useRef<HTMLInputElement>(null);

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e =>
		setImage(e.target.files ? e.target.files[0] : null);

	const handleClick = () => imageInputRef.current?.click();

	const getPreview = (image: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result as string);
		};
		reader.readAsDataURL(image);
	};

	React.useEffect(() => {
		image && getPreview(image);
	}, [image]);

	return (
		<Flex
			border={setSize(0.056)}
			borderRadius={setSize(Sizes.borderRadius)}
		>
			{preview ? (
				<Image objectFit="cover" src={preview} />
			) : (
				<IconButton
					aria-label="upload image"
					border={`${setSize(0.056)} dotted`}
					borderColor={Colors.dark.surfaceColor}
					h={setSize(11.111)}
					icon={
						<Icon
							as={FiPlusCircle}
							color={Colors.light.primaryTextColor}
							fontSize="4xl"
						/>
					}
					onClick={handleClick}
					variant="outline"
					w="full"
				/>
			)}
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
