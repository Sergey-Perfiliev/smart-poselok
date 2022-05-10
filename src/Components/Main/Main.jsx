import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { signOut } from '../../Redux/auth-reducer'
import { getSelfProfile, setCurrentVillage } from '../../Redux/profile-reducer'
import Profile from '../Profile/Profile'
import { getVillages } from '../../Redux/village-reducer'
import { createVote, getCurrentVote, makeVote } from '../../Redux/vote-reducer'
import { addNotification } from '../../Redux/notification-reducer'

const Main = (props) => {
	React.useEffect(() => {
		props.getSelfProfile(props.token)
	}, [])

	return (
		<div>
			{
				!!props.profile && !!props.villages.length && <div>
					<Header
						email={props.profile.email}
						signOut={props.signOut}
					/>
					<Profile
						{...props}
					/>
				</div >
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	token: state.auth.token,
	profile: state.profile.profile,
	currentVillage: state.profile.currentVillage,
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
	addNotification,
	makeVote
})(Main)