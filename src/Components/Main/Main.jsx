import React from 'react'
import { connect } from 'react-redux'

const Main = (props) => {
	return (
		<>
			<div>{props.email}</div>
			<div>{props.password}</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	password: state.auth.password,
})

export default connect(mapStateToProps, {})(Main)