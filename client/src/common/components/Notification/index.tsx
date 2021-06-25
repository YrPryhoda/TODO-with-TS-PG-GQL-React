import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import styles from './styles.module.scss';

type Props = {
	title: string;
	open: boolean;
	onClose: (arg: boolean) => void;
	type: 'error' | 'success' | 'info';
};

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function CustomizedSnackbars(props: Props) {
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		props.onClose(false);
	};

	return (
		<div className={styles.root}>
			<Snackbar
				open={props.open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={props.type}>
					{props.title}
				</Alert>
			</Snackbar>
		</div>
	);
}
