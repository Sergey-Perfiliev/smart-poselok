import React from 'react'
import AsyncSelect from 'react-select';
import colors from '../../colors.scss'

const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderColor: `${colors.primary}`,
		boxShadow: null,
		"&:hover": {
			// Overwrittes the different states of border
			border: `1px solid ${colors.secondary}`
		}
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? 'white' : 'black',
		backgroundColor: state.isSelected ? `${colors.secondary}` : 'white',
		"&:hover": {
			backgroundColor: state.isSelected ? `${colors.secondary}` : `${colors.light}`
		}
	})
}

const CustomAsyncSelect = ({ data, value, onChange, placeholder = 'Выберите...', query }) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([])
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}
		
		query()

		if (active && data) {
			setOptions([...data]);
		}

		return () => {
			active = false;
		};
	}, [loading, data]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<AsyncSelect
			styles={customStyles}
			onMenuOpen={() => {
				setOpen(true)
			}}
			onMenuClose={() => {
				setOpen(false)
			}}
			className='react-select__control'
			noOptionsMessage={() => 'Ничего не найдено'}
			placeholder={placeholder}
			loadingMessage={() => 'Поиск...'}
			getOptionLabel={e => e.name}
			getOptionValue={e => e.id}
			value={value}
			onChange={onChange}
			options={options}
			isLoading={loading}
		/>
	)
}

export default CustomAsyncSelect