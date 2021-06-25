import React from 'react';
import { TextField, Popper, Grid, Avatar } from '@material-ui/core';

import { useLoadAvatar } from '../../../bus/Customer/hooks/useLoadAvatar';
import { Customer } from '../../../generated/graphql';
import styles from './styles.module.scss';

interface Props {
	customer: Customer;
	open: boolean;
	anchorEl: HTMLElement;
}

const CustomerInfoPopper = ({ anchorEl, customer, open }: Props) => {
	const { email, firstName, lastName, id, age, city } = customer;
	const { avatar } = useLoadAvatar();

	return (
		<Popper
			id={id}
			open={open}
			anchorEl={anchorEl}
			placement={'bottom-end'}
			transition
		>
			<Grid
				container
				direction='column'
				spacing={2}
				className={styles.paper}
			>
				<Grid container item direction='row'>
					<Grid
						container
						item
						xs={4}
						justify='center'
						alignContent='center'
					>
						<Avatar
							className={styles.avatar}
							alt='Cindy Baker'
							src={avatar}
						/>
					</Grid>
					<Grid
						xs={8}
						container
						item
						direction='column'
						justify='space-between'
					>
						<TextField
							fullWidth
							label='First Name'
							defaultValue={firstName}
							InputProps={{
								readOnly: true
							}}
						/>
						<TextField
							fullWidth
							label='Last Name'
							defaultValue={lastName}
							InputProps={{
								readOnly: true
							}}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='outlined-basic'
						label='Email'
						defaultValue={email}
						InputProps={{
							readOnly: true
						}}
					/>
				</Grid>
				<Grid container item xs={12} justify='space-between'>
					<TextField
						className={styles.rowField}
						label='City'
						defaultValue={city || 'Not set'}
						InputProps={{
							readOnly: true
						}}
					/>
					<TextField
						label='Age'
						defaultValue={age || 'Not set'}
						InputProps={{
							readOnly: true
						}}
					/>
				</Grid>
			</Grid>
		</Popper>
	);
};

export default CustomerInfoPopper;
