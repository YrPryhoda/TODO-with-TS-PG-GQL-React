import React from 'react';
import { Modal, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//local
import styles from './styles.module.scss';
import FormField from '../../../common/components/FormField';
import MyButton from '../../../common/components/Button';
import { useForm } from '../../common/hooks/useForm';
import { useAddTask } from '../hooks/useCreateTask';

interface Props {
	isOpenModal: boolean;
	handleCloseModal: () => void;
}

const AddTaskModal = ({ isOpenModal, handleCloseModal }: Props) => {
	const initialState = {
		title: '',
		description: ''
	};

	const { form, onChange, setForm } =
		useForm<typeof initialState>(initialState);
	const { addTask, loading } = useAddTask();

	const handleSubmit = (event: React.MouseEvent) => {
		event.preventDefault();
		addTask(form);
		setForm(initialState);
		handleCloseModal();
	};

	return (
		<div>
			{loading && <p>LOADING</p>}
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
							Add new task
						</Typography>
						<form className={styles.form} noValidate>
							<FormField
								onChange={onChange}
								value={form.title}
								label='Task title'
								name='title'
							/>

							<FormField
								onChange={onChange}
								value={form.description}
								label='Small description'
								name='description'
							/>

							<MyButton
								onClick={handleSubmit}
								className={styles.btn}
								children='Create'
							/>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddTaskModal;
