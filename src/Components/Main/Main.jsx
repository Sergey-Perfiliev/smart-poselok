import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../Redux/auth-reducer'
import {
	getSelfProfile,
	setCurrentVillage,
	setUserProfile,
	setCurrentRole,
	requestNeighbours,
	confirmPayment,
	openGates
} from '../../Redux/profile-reducer'
import Profile from '../Profile/Profile'
import { getVillages } from '../../Redux/village-reducer'
import { createVote, getCurrentVote, makeVote } from '../../Redux/vote-reducer'
import { addNotification } from '../../Redux/notification-reducer'
import { setShowUsersData } from '../../Redux/users-reducer'

const Main = (props) => {
	React.useEffect(() => {
		props.getSelfProfile(props.token)

		return (() => setUserProfile(null))
	}, [])

	return (
		<div className='content-section'>
			{
				!!props.profile && !!props.villages &&
				<Profile
					{...props}
				/>
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	token: state.auth.token,
	profile: state.profile.profile,
	currentVillage: state.profile.currentVillage,
	currentRole: state.profile.currentRole,
	neighbours: state.profile.neighbours,
	villages: state.village.villages,
	streets: state.village.streets,
	vote: state.vote.currentVote
})

export default connect(mapStateToProps, {
	getSelfProfile,
	getVillages,
	signOut,
	createVote,
	getCurrentVote,
	setCurrentVillage,
	setCurrentRole,
	addNotification,
	makeVote,
	setShowUsersData,
	requestNeighbours,
	confirmPayment,
	openGates
})(Main)