import { Flex, Icon, IconButton, Image, Input } from '@chakra-ui/react';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { Colors, Sizes } from '../../constants';
import { setSize } from '../../helpers';
import { IPostRecipe } from '../../models';
import { useAddPost } from '../AddPost/helpers';

import { Text } from '../Text';

interface IComponentProps {
	handleChange: ({}: IPostRecipe) => void;
	preview?: IPostRecipe['image'];
}

export const ImageBox: React.FC<IComponentProps> = ({
	handleChange,
	preview,
}) => {
	const { processImage } = useAddPost();

	const [errMsg, setErrMsg] = React.useState(``);
	const [image, setImage] = React.useState<File | null>(null);

	console.log(`RecipeEditor.ImageBox.errMsg: ${errMsg}`);

	const imageInputRef = React.useRef<HTMLInputElement>(null);

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
		async e => setImage(e.target.files ? e.target.files[0] : null);

	const handleClick = () => imageInputRef.current?.click();

	const getPreview = async (image: File) => {
		const processedImage = await processImage(image);
		if (processedImage.failure) {
			setErrMsg(processedImage.failure);
		} else {
			handleChange(processedImage.success as IPostRecipe);
		}
	};

	React.useEffect(() => {
		image && getPreview(image);
	}, [image]);

	return (
		<Flex
			border={setSize(0.056)}
			borderRadius={setSize(Sizes.borderRadius)}
			flexDir="column"
		>
			<Text as="h4">Image</Text>
			{preview?.data ? (
				<Image alt={preview.name} objectFit="cover" src={preview.data} />
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
