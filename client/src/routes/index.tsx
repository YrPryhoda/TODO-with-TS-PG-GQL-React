import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { routes } from './routes';
import PrivateRoute from '../common/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import TasksPage from '../pages/TasksPage';

const Routes = () => {
	return (
		<Switch>
			<Route exact path={routes.signUp} component={SignUpPage} />
			<Route exact path={routes.login} component={LoginPage} />
			<PrivateRoute>
				<Route
					exact
					path={[routes.root, routes.else]}
					component={TasksPage}
				/>
			</PrivateRoute>
		</Switch>
	);
};

export default Routes;
