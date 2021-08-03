import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { customTheme } from './constants';
import { store } from './state';

import { App } from './App';

render(
	<React.StrictMode>
		<ChakraProvider theme={customTheme}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
