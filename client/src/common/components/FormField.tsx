import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
	value: string;
	name: string;
	label: string;
	onChange: (event: React.BaseSyntheticEvent) => void;
	required?: boolean;
	className?: string;
	type?: string;
}

const FormField = ({
	name,
	label = '',
	value = '',
	onChange,
	required,
	className,
	type = 'text'
}: Props) => {
	return (
		<TextField
			variant='outlined'
			margin='normal'
			required={required || true}
			fullWidth
			label={label}
			name={name}
			onChange={onChange}
			value={value}
			type={type}
			className={className || ''}
		/>
	);
};

export default FormField;
