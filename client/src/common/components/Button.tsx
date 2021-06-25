import React, { MouseEventHandler } from 'react';
import { Button, PropTypes } from '@material-ui/core';

interface Props {
	color?: PropTypes.Color;
	className?: string;
	children: string;
	onClick: MouseEventHandler;
}

const MyButton = ({
	onClick,
	color = 'primary',
	className,
	children
}: Props) => {
	return (
		<Button
			type='submit'
			fullWidth
			variant='contained'
			color={color}
			className={className || ''}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default MyButton;
