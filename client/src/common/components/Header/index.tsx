// external
import React from 'react';
import { Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// local
import styles from './styles.module.scss';
import { routes } from '../../../routes/routes';
import { IStore } from '../../../init/redux/reducer';
import { CustomerReducer } from '../../../bus/Customer/redux/reducer';
import { useLogOut } from '../../../bus/Customer/hooks/useLogOut';
import CustomerInfoPopper from '../CustomerInfoPopper';

const Header = () => {
	const { logout } = useLogOut();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const { me: customer } = useSelector<IStore, CustomerReducer>(
		state => state.customer
	);

	const userTitleJSX = customer ? (
		<Button
			startIcon={<AccountCircleIcon />}
			onClick={handleClick}
			className={styles.userTitle}
		>
			{customer.firstName}
		</Button>
	) : null;

	const userInfoModalJSX = customer ? (
		<CustomerInfoPopper
			customer={customer}
			open={Boolean(anchorEl)}
			anchorEl={anchorEl!}
		/>
	) : null;

	return (
		<React.Fragment>
			<Toolbar className={styles.toolbar}>
				<IconButton
					size='medium'
					color='primary'
					aria-label='upload picture'
				>
					<Link to={routes.root} className={styles.link}>
						<AccessTimeIcon />
					</Link>
				</IconButton>
				<Typography
					component='h2'
					variant='h5'
					color='inherit'
					align='center'
					noWrap
					className={styles.toolbarTitle}
				>
					TODOER
				</Typography>
				{userTitleJSX}
				{userInfoModalJSX}
				<Button onClick={logout} variant='outlined' size='small'>
					Sign out
				</Button>
			</Toolbar>
		</React.Fragment>
	);
};

export default Header;
