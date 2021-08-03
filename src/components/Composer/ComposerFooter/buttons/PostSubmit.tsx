import { Button } from '@chakra-ui/react';
import React from 'react';

interface IComponentProps {
	handleSubmit: () => void;
}

export const PostSubmit: React.FC<IComponentProps> = ({
	handleSubmit,
}) => {
	return (
		<Button letterSpacing="wider" onClick={handleSubmit} variant="outline">
			POST
		</Button>
	);
};
