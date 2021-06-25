import React from 'react';
import { Grid, Modal, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//local
import styles from './styles.module.scss';
import MyButton from '../../../common/components/Button';

interface Props {
	confirm: () => void;
	isOpenModal: boolean;
	handleCloseModal: () => void;
}

const DeleteConfirmModal = ({
	confirm,
	isOpenModal,
	handleCloseModal
}: Props) => {
	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		confirm();
		handleCloseModal();
	};

	return (
		<div>
			<Modal
				className={styles.modal}
				open={isOpenModal}
				onClose={handleCloseModal}
				closeAfterTransition
				disableScrollLock
				disableEscapeKeyDown
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={isOpenModal}>
					<div className={styles.paper}>
						<Typography align='center' variant='h5'>
							Are you sure to delete all your tasks?
						</Typography>
						<Grid container item justify='space-between'>
							<MyButton
								color='secondary'
								onClick={handleSubmit}
								className={styles.btn}
								children='Confirm'
							/>

							<MyButton
								onClick={handleCloseModal}
								className={styles.btn}
								children='Cancel'
							/>
						</Grid>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default DeleteConfirmModal;
