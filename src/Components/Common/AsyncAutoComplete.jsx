import React from 'react'

import { TextField, CircularProgress } from '@mui/material';
import { AuthAutocomplete } from '../Auth/AuthFields';

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

const AsyncAutoComplete = ({ data, label, value, disabled, onChange, required = true, query, width = 100 }) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;
	
	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			// query
			await sleep(300)

			if (active) {
				setOptions([...data]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<AuthAutocomplete
			sx={{ width: `${width}%` }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			onChange={(event, values) => onChange(values)}
			options={options}
			disabled={disabled}
			loading={loading}
			className='auth-input-custom'
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					required={required}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	)
}

export default AsyncAutoComplete