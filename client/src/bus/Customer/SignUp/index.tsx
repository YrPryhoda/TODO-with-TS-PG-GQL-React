import React, { BaseSyntheticEvent, useState } from 'react';
import {
	Avatar,
	CssBaseline,
	Grid,
	Typography,
	Paper,
	LinearProgress
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

//local
import styles from './styles.module.scss';
import { routes } from '../../../routes/routes';
import { useForm } from '../../common/hooks/useForm';
import { useSignUp } from '../hooks/useSignUp';
import FormField from '../../../common/components/FormField';
import MyButton from '../../../common/components/Button';
import { CustomerInput } from '../../../generated/graphql';
import CustomizedSnackbars from '../../../common/components/Notification';

const SignUp = () => {
	const initialForm: CustomerInput = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		age: null,
		city: null
	};

	const { form, onChange } = useForm(initialForm);
	const [errorModal, setErrorModal] = useState<boolean>(false);
	const { customer, error, loading, save } = useSignUp();
	const handlerClick = (event: BaseSyntheticEvent) => {
		event.preventDefault();
		save(form);
	};

	React.useEffect(() => {
		setErrorModal(true);
	}, [error]);

	const errorJSX: React.ReactElement | null = error ? (
		<CustomizedSnackbars
			title={error.message}
			type='error'
			open={errorModal}
			onClose={() => setErrorModal(false)}
		/>
	) : null;

	const loaderJSX: React.ReactElement | null =
		loading && !customer ? (
			<div className={styles.loader}>
				<LinearProgress />
			</div>
		) : null;

	return (
		<Grid container component='main' className={styles.root}>
			<CssBaseline />
			{loaderJSX}

			<Grid item xs={12} sm={12} md={7} className={styles.image} />
			<Grid
				item
				xs={12}
				sm={12}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={styles.paper}>
					<Avatar className={styles.avatar}>
						<Home />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form className={styles.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<FormField
									name='firstName'
									label='First Name'
									value={form.firstName}
									onChange={onChange}
									className={styles.noMargin}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormField
									name='lastName'
									label='Last Name'
									value={form.lastName}
									onChange={onChange}
									className={styles.noMargin}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormField
									name='city'
									label='Your city'
									value={form.city || ''}
									onChange={onChange}
									className={styles.noMargin}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormField
									name='age'
									label='Your age'
									value={form.age?.toString() || ''}
									onChange={onChange}
									className={styles.noMargin}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormField
									name='email'
									label='Email Address'
									value={form.email}
									onChange={onChange}
									className={styles.noMargin}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormField
									name='password'
									label='Password'
									value={form.password}
									onChange={onChange}
									type={'password'}
									className={styles.noMargin}
								/>
							</Grid>
						</Grid>
						<MyButton
							onClick={handlerClick}
							color='primary'
							className={styles.submit}
						>
							Sign Up
						</MyButton>
						<Grid container justify='flex-end'>
							<Grid item>
								<NavLink to={routes.login}>
									Already have an account? Sign in
								</NavLink>
							</Grid>
						</Grid>

						{errorJSX}
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default SignUp;
