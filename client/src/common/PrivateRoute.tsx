import { LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useMe } from '../bus/Customer/hooks/useMe';
import { routes } from '../routes/routes';

type Props = {
	children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
	const { loading, customer } = useMe();

	const history = useHistory();

	if (loading) {
		return <LinearProgress />;
	}

	if (customer) {
		return children;
	}

	history.push(routes.login);
	return null;
};

export default PrivateRoute;
