import {
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Checkbox
} from '@material-ui/core';
import React from 'react';

//local 
import { useLoadTasks } from '../hooks/useLoadTasks';
import { useUpdateTask } from '../hooks/useUpdateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import styles from './styles.module.scss';

const TasksList = () => {
	const { tasks } = useLoadTasks();
	const { updateStatus } = useUpdateTask();
	const { deleteItem } = useDeleteTask();

	const tasksJSX =
		tasks && tasks.length ? (
			tasks.map(task => (
				<ListItem key={task.id} dense button>
					<ListItemIcon>
						<Checkbox
							onClick={() => updateStatus(task.id, task.done)}
							edge='start'
							checked={task.done}
							disableRipple
							inputProps={{ 'aria-labelledby': task.id }}
						/>
					</ListItemIcon>

					<ListItemText id={task.id}> {task.title} </ListItemText>
					<ListItemText> {task.description} </ListItemText>
					<ListItemSecondaryAction>
						<Button onClick={() => deleteItem(task.id)} color='secondary'>
							Delete
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
			))
		) : (
			<ListItem> List is empty, but you can start it</ListItem>
		);

	return <List className={styles.root}>{tasksJSX}</List>;
};

export default TasksList;
