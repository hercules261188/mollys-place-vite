import {
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

import { BannerImage, Layout, Overlay } from '../components';
import { Sizes, Strings } from '../constants';
import { setSize } from '../helpers';

import { IUserCredentials } from '../models';
import { useAuth } from '../services';

interface IComponentProps {}

export const SignInPage: React.FC<IComponentProps> = () => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const INITIAL_STATE: IUserCredentials = {
		email: ``,
		password: ``,
	};
	const [credentials, setCredentials] = React.useState(INITIAL_STATE);
	const { email, password } = credentials;

	const { signIn } = useAuth();

	const {
		signInPageBannerImage,
		site: { name },
	} = Strings;

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
		setCredentials({ ...credentials, [e.target.name]: e.target.value });

	const handleSubmit: React.FormEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		signIn(credentials);
	};

	return (
		<Layout>
			<Flex flex={1} justifyContent="center" mx={setSize(Sizes.gap)}>
				<Flex
					alignItems="center"
					flexDir="column"
					maxW={setSize(30)}
					onSubmit={handleSubmit}
					w="full"
				>
					<BannerImage {...signInPageBannerImage} overlay={Overlay.medium}>
						<Flex alignItems="center" flex={1} justifyContent="center">
							<Text
								fontFamily="Great Vibes"
								fontSize={setSize(isLargeScreen ? 2.6 : 1.8)}
								lineHeight={1.25}
								pl={setSize(0.111)}
								pr={setSize(0.444)}
								textShadow="2px 2px 2px rgba(0, 0, 0, 0.4)"
							>
								{`Welcome to ${name}!`}
							</Text>
						</Flex>
					</BannerImage>
					<Flex
						as="form"
						flexDir="column"
						justifyContent="center"
						maxW={setSize(22.222)}
						onSubmit={handleSubmit}
						w="full"
					>
						<FormControl id="email">
							<FormLabel>Email Address</FormLabel>
							<Input
								name="email"
								onChange={handleChange}
								required
								type="email"
								value={email}
							/>
							<FormHelperText fontStyle="italic" textAlign="end">
								We'll never share your email.
							</FormHelperText>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								name="password"
								onChange={handleChange}
								required
								type="password"
								value={password}
							/>
						</FormControl>
						<Button mt={setSize(Sizes.gap * 1.5)} type="submit">
							Submit
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Layout>
	);
};
