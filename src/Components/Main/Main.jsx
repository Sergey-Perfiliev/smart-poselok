import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { signOut } from '../../Redux/auth-reducer'
import Profile from '../Profile/Profile'

const Main = (props) => {
	return (
		<>
			<Header 
				email={props.email} 
				signOut={props.signOut} 
			/>
			<Profile 
				email={props.email} 
				neighbours={props.neighbours} 
				vote={props.vote} 
				role={props.role} 
			/>
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	password: state.auth.password,
	role: state.auth.role,
	neighbours: state.profile.neighbours,
	vote: state.profile.currentVote
})

export default connect(mapStateToProps, {signOut})(Main)