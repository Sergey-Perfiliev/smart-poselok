import { Field, Form, withFormik } from 'formik'
import React from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup'

const Registration = (props) => {
	const { touched, errors } = props;

	if (props.isAuth)
		return <Navigate to={"/"} />

	return (
		<div>
			<h2>Registration</h2>
			<Form>
				<div>
					<label htmlFor="email">Email</label>
					<Field type="text" name="email" placeholder="email" />
					{touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<Field type="password" name="password" placeholder="Password" />
					{touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span>}
				</div>
				<button type='submit'>Sign up</button>
			</Form>
		</div >
	)
}

const RegistrationFormik = withFormik({
	mapPropsToValues: (props) => {
		return {
			email: props.email || 'ser@gmail.com',
			password: props.password || ''
		}
	},
	validationSchema: yup.object({
		email: yup
			.string()
			.required()
			.max(20)
			.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email address"),
		password: yup
			.string()
			.required('Password is required'),
	}),
	handleSubmit: (values, { setSubmitting }) => {
		setSubmitting(true)
		// async call
		console.log(values)
		setSubmitting(false)
	}
})(Registration);

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {})(RegistrationFormik)