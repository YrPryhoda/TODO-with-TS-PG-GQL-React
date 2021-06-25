import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider as Redux } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

//local
import { client } from './init/client';
import Routes from './routes';
import { store } from './init/redux';

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Redux store={store}>
				<Router>
					<Routes />
				</Router>
			</Redux>
		</ApolloProvider>
	);
};

export default App;
