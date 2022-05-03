import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { signOut } from '../../Redux/auth-reducer'
import { getSelfProfile, addVote } from '../../Redux/profile-reducer'
import Profile from '../Profile/Profile'

const Main = (props) => {
	React.useEffect(() => {
		getSelfProfile(props.token)
	
		return () => {}
	}, [props.token])
	
	return (
		<>
			<Header 
				email={props.profile.email} 
				signOut={props.signOut} 
			/>
			<Profile
				profile={props.profile} 
				neighbours={props.neighbours} 
				vote={props.vote}
				villages={props.villages}
				addVote={props.addVote}
			/>
		</>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	token: state.auth.token,
	villages: state.villages.villages,
	neighbours: state.profile.neighbours,
	vote: state.profile.currentVote
})

export default connect(mapStateToProps, {getSelfProfile, signOut, addVote})(Main)