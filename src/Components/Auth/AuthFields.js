import { styled } from '@mui/material/styles';
import { TextField, Autocomplete, MenuItem, Checkbox } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';

export const AuthTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'black',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#24b66d',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#24b66d',
		},
		'&:hover fieldset': {
			borderColor: '#24b66d',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#24b66d',
		},
	},
});

export const AuthAutocomplete = styled(Autocomplete)({
	'& label.Mui-focused': {
		color: 'black',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#24b66d',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#24b66d',
		},
		'&:hover fieldset': {
			borderColor: '#24b66d',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#24b66d',
		},
	},
});

export const AuthOutlinedInput = styled(OutlinedInput)({
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#24b66d',
		color: 'black',
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#24b66d',
	},
	'&.Mui-focused': {
		color: 'black',
		// css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#24b66d !important',
	},
	// "& .notchedOutline": {
	// 	borderColor: "green"
	// },
	// "&:hover .notchedOutline": {
	// 	borderColor: "green"
	// },
	// "&$focused .notchedOutline": {
	// 	borderColor: "green"
	// }
});

export const AuthMenuItem = styled(MenuItem)({
	'&.Mui-selected': {
		backgroundColor: '#EFEFEF',
	},
	'&.Mui-focused': {
		backgroundColor: '#EFEFEF',
	},
	'&.Mui-focusVisibleClassName': {
		backgroundColor: '#EFEFEF',
	},
	'&.Mui-selected:hover': {
		backgroundColor: '#CECECE',
	},
	'&.Mui-gutter:hover': {
		backgroundColor: '#EFEFEF',
	}
})

export const AuthCheckbox = styled(Checkbox)({
	color: '#24b66d',
	'&.Mui-checked': {
		color: '#24b66d',
	},
});
