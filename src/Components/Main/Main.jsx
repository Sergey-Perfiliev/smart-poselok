import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { signOut } from '../../Redux/auth-reducer'

const Main = (props) => {
	return (
		<>
			<Header email={props.email} signOut={props.signOut} />
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	password: state.auth.password,
})

export default connect(mapStateToProps, {signOut})(Main)