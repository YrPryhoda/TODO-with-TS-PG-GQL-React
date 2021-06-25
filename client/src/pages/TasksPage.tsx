// core
import { Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';

// local
import AddTaskModal from '../bus/Task/AddTask';
import TasksList from '../bus/Task/TasksList';
import Header from '../common/components/Header';
import DeleteConfirmModal from '../common/components/DeleteConfirmModal';
import { useDeleteAllTasks } from '../bus/Task/hooks/useDeleteAllTasks';
import CustomizedSnackbars from '../common/components/Notification';

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

const TasksPage = () => {
	const { deleteAll, count } = useDeleteAllTasks();
	const [isOpenAddModal, setAddModal] = useState(false);
	const [isOpenDeleteModal, setDeleteModal] = useState(false);
	const [isOpenDeleteAllModal, setDeleteAllModal] = useState(false);

	const handleOpenModal = (stateFunc: SetStateType<boolean>): void =>
		stateFunc(true);

	const handleCloseModal = (stateFunc: SetStateType<boolean>): void =>
		stateFunc(false);

	const deletedAllTaskInfoJSX = (
		<CustomizedSnackbars
			open={isOpenDeleteAllModal}
			onClose={() => handleCloseModal(setDeleteAllModal)}
			title={`Deleted ${count} task(s)`}
			type='info'
		/>
	);

	const handleConfirmDelete = async () => {
		const response = await deleteAll();

		if (response?.data?.removeAllTasks.count) {
			setDeleteAllModal(true);
		}
	};

	return (
		<>
			<Header />
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
			>
				<Grid
					style={{ margin: '20px' }}
					container
					justify='flex-end'
					item
					xs={10}
				>
					<Button
						onClick={() => handleOpenModal(setAddModal)}
						variant='contained'
						color='primary'
					>
						Add task
					</Button>
					<Button
						style={{ marginLeft: '20px' }}
						onClick={() => handleOpenModal(setDeleteModal)}
						variant='contained'
						color='secondary'
					>
						Delete All
					</Button>
				</Grid>
				<Grid container justify='center' item xs={12} md={8}>
					<TasksList />
				</Grid>
				<AddTaskModal
					isOpenModal={isOpenAddModal}
					handleCloseModal={() => handleCloseModal(setAddModal)}
				/>
				<DeleteConfirmModal
					isOpenModal={isOpenDeleteModal}
					handleCloseModal={() => handleCloseModal(setDeleteModal)}
					confirm={handleConfirmDelete}
				/>
				{deletedAllTaskInfoJSX}
			</Grid>
		</>
	);
};

export default TasksPage;
