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
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, { setSubmitting }) => {
			// async call
			props.login(values.email, values.password)
				.finally(() => setSubmitting(false))
		}
	})

	if (props.isAuth) {
		return <Navigate to="/" />
	}

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
						error={Boolean(props.error) || (formik.touched.email && Boolean(formik.errors.email))}
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
						error={Boolean(props.error) || (formik.touched.password && Boolean(formik.errors.password))}
						helperText={formik.touched.password && formik.errors.password}
					/>
				</div>
				{props.error && <div className='auth-error'>{props.error}</div>}
				<div className='auth-buttons'>
					<Link to={formik.isSubmitting ? '#' : '/registration'} className='btn btn-profile'>Создать аккаунт</Link>
					<button className='btn btn-profile' type="submit" disabled={formik.isSubmitting}>
						Войти
					</button>
				</div>
			</form>
		</Auth>
	)
}

const mapStateToProps = (state) => ({
	error: state.auth.loginError
})

export default connect(mapStateToProps, { login })(Login)