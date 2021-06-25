import React from 'react';
import {
	Avatar,
	CssBaseline,
	Grid,
	Typography,
	Container,
	LinearProgress
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

//local
import styles from './styles.module.scss';
import { routes } from '../../../routes/routes';
import { useForm } from '../../common/hooks/useForm';
import FormField from '../../../common/components/FormField';
import MyButton from '../../../common/components/Button';
import { useLogin } from '../hooks/useLogin';
import Notification from '../../../common/components/Notification';

interface Props {}

const Login = (props: Props) => {
	const [open, setOpen] = React.useState(false);
	const { form, onChange } = useForm({
		email: '',
		password: ''
	});
	const { save, loading, error } = useLogin();

	if (error && !open) {
		setOpen(true);
	}

	const errorJSX = (
		<Notification open={open} onClose={setOpen} title={error!} type='error' />
	);

	const loaderJSX: React.ReactElement | null = loading ? (
		<div className={styles.loader}>
			<LinearProgress />
		</div>
	) : null;

	return (
		<>
			{loaderJSX}
			<Container component='main' maxWidth='xs' className={styles.main}>
				{errorJSX}
				<CssBaseline />
				<div className={styles.paper}>
					<Avatar className={styles.avatar}>
						<Home />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form className={styles.form} noValidate>
						<FormField
							onChange={onChange}
							value={form.email}
							label='Email Address'
							name='email'
						/>

						<FormField
							onChange={onChange}
							value={form.password}
							type='password'
							label='Password'
							name='password'
						/>

						<MyButton
							onClick={event => save(event, form)}
							className={styles.submit}
							children='Sign In'
						/>

						<Grid container>
							<Grid item>
								<NavLink className={styles.link} to={routes.signUp}>
									{"Don't have an account? Sign Up"}
								</NavLink>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};

export default Login;
