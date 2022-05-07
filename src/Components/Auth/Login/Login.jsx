import React from 'react'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../../Redux/auth-reducer'
import * as yup from 'yup'
import Auth from '../Auth';
import { AuthTextField } from '../AuthFields'
import '../Auth.scss'

const validationSchema = yup.object({
	email: yup
		.string()
		.required()
		.max(20)
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Введите адрес электронной почты"),
	password: yup
		.string()
		.required('Введите пароль'),
})

const Login = (props) => {
	const formik = useFormik({
		initialValues: {
			email: props.email || 'ser@gmail.com',
			password: props.password || ''
		},
		validationSchema: validationSchema,
		onSubmit: (values, { login, setSubmitting }) => {
			setSubmitting(true)
			// async call
			console.log(values)
			props.login(values.email, values.password)
			setSubmitting(false)
		}
	})

	if (props.isAuth)
		return <Navigate to={"/"} />

	return (
		<Auth title={'Вход'}>
			<form className='auth-form' onSubmit={formik.handleSubmit}>
				<div className='form-inputWrapper'>
					<AuthTextField
						fullWidth
						name="email"
						label="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						InputProps={{
							style: {}
						}}
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
					/>
				</div>
				<div className='auth-buttons'>
					<Link to={'/registration'} className='btn btn-profile'>Создать аккаунт</Link>
					<button className='btn btn-profile' type="submit">
						Войти
					</button>
				</div>
			</form>
		</Auth>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)