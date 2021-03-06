import { useFormik } from 'formik'
import React from 'react'
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup'
import Auth from '../Auth';
import { register } from '../../../Redux/auth-reducer'
import { getVillages, getStreets, getLandPlots } from '../../../Redux/village-reducer'
import { AuthCheckbox, AuthMenuItem, AuthOutlinedInput, AuthTextField } from '../AuthFields';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { convertRole } from '../../../Helpers/convertRole';
import AsyncAutoComplete from '../../Common/AsyncAutoComplete';

const validationSchema = yup.object({
	email: yup
		.string()
		.required()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Введите адрес электронной почты"),
	password: yup
		.string()
		.required('Введите пароль'),
	lastName: yup
		.string()
		.required('Введите фамилию'),
	firstName: yup
		.string()
		.required('Введите имя'),
})

// const roles = ['admin', 'representative', 'resident']

const Registration = (props) => {
	let { villages, streets, land_plots } = props

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			patronymic: '',
			roles: [],
		},
		validationSchema: validationSchema,
		onSubmit: (values, { setSubmitting }) => {
			console.log(values.email, values.firstName, values.lastName, values.patronymic,
				values.password, landPlot?.id, village?.id, values.roles)
			setSubmitting(true)
			// async call
			props.register(values.email, values.firstName, values.lastName, values.patronymic,
				values.password, landPlot?.id, village.id, values.roles)
			setSubmitting(false)
		},
	})

	const [roleName, setRoleName] = React.useState([])
	const [village, setVillage] = React.useState(null)
	const [street, setStreet] = React.useState(null)
	const [landPlot, setLandPlot] = React.useState(null)
	const [disabledValue, setDisabledValue] = React.useState(null)
	
	React.useEffect(() => {
		setVillage(null)
		setStreet(null)
		setLandPlot(null)
	}, [disabledValue])

	React.useEffect(() => {
		if (village === null) {
			setStreet(null)
			setLandPlot(null)
		}
	}, [village])

	React.useEffect(() => {
		if (street === null) {
			setLandPlot(null)
		}
	}, [street])

	const handleChange = (event) => {
		// set values to formik
		formik.values.roles = event.target.value.map(v => v = convertRole(v))
		const { target: { value } } = event

		// disable checkbox 
		if (value.some(v => v === convertRole('resident'))) {
			setDisabledValue('representative')
		} else if (value.some(v => v === convertRole('representative'))) {
			setDisabledValue('resident')
		} else if (value.some(v => v === convertRole('admin'))) {
			setDisabledValue('admin')
		} else {
			setDisabledValue(null)
		}

		// set values into a component A, B || A
		setRoleName(typeof value === 'string' ? value.split(',') : value)
	}

	if (props.isAuth)
		return <Navigate to={"/"} />

	return (
		<Auth title={'Регистрация'}>
			<form className='auth-form' onSubmit={formik.handleSubmit}>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="email"
						label="Email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						required
					/>
				</div>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						required
					/>
				</div>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="lastName"
						label="Фамилия"
						value={formik.values.lastName}
						onChange={formik.handleChange}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
						required
					/>
				</div>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="firstName"
						label="Имя"
						value={formik.values.firstName}
						onChange={formik.handleChange}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
						required
					/>
				</div>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="patronymic"
						label="Отчество"
						value={formik.values.patronymic}
						onChange={formik.handleChange}
					/>
				</div>
				<div className='form-inputWrapper'>
					<FormControl sx={{ width: '100%' }} required>
						<InputLabel id="role-multiple-checkbox-label">Роль</InputLabel>
						<Select
							labelId="role-multiple-checkbox-label"
							multiple
							value={roleName}
							onChange={handleChange}
							input={<AuthOutlinedInput required label="Tag" />}
							renderValue={(selected) => selected.join(', ')}
						>
							<AuthMenuItem value={convertRole('admin')}>
								<AuthCheckbox checked={roleName.indexOf(convertRole('admin')) > -1} />
								<ListItemText primary={convertRole('admin')} />
							</AuthMenuItem>
							<ListSubheader>Житель</ListSubheader>
							<AuthMenuItem disabled={disabledValue === 'representative'} value={convertRole('representative')}>
								<AuthCheckbox checked={roleName.indexOf(convertRole('representative')) > -1} />
								<ListItemText primary={convertRole('representative')} />
							</AuthMenuItem>
							<AuthMenuItem disabled={disabledValue === 'resident'} value={convertRole('resident')}>
								<AuthCheckbox checked={roleName.indexOf(convertRole('resident')) > -1} />
								<ListItemText primary={convertRole('resident')} />
							</AuthMenuItem>
						</Select>
					</FormControl>
				</div>
				<div className='form-inputWrapper'>
					<AsyncAutoComplete
						data={villages}
						query={() => props.getVillages()}
						label={'Посёлок'}
						value={village}
						onChange={setVillage}
						disabled={!disabledValue}
					/>
				</div>
				<div className='form-inputWrapper'>
					<AsyncAutoComplete
						data={streets}
						query={() => props.getStreets(village?.id)}
						label={'Улица'}
						width='47'
						value={street}
						onChange={setStreet}
						disabled={!disabledValue || disabledValue === 'admin' || !village}
					/>
					<AsyncAutoComplete
						data={land_plots}
						query={() => props.getLandPlots(street?.id)}
						label={'Дом'}
						width='47'
						value={landPlot}
						onChange={setLandPlot}
						disabled={!disabledValue || disabledValue === 'admin' || !street}
					/>
				</div>
				{props.error && <div className='auth-error'>{props.error}</div>}
				<div className='auth-buttons'>
					<Link to={'/login'} className='btn btn-profile'>Назад</Link>
					<button className='btn btn-profile' type="submit">
						Зарегистрироваться
					</button>
				</div>
			</form>
		</Auth>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	villages: state.village.villages,
	streets: state.village.streets,
	land_plots: state.village.land_plots,
	error: state.auth.registerError
})

export default connect(mapStateToProps, { register, getVillages, getStreets, getLandPlots })(Registration)