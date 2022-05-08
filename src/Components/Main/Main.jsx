import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { signOut } from '../../Redux/auth-reducer'
import { getSelfProfile, setNewVote } from '../../Redux/profile-reducer'
import Profile from '../Profile/Profile'

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
						profile={props.profile}
						neighbours={props.neighbours}
						vote={props.vote}
						villages={props.villages}
						streets={props.streets}
						setNewVote={props.setNewVote}
					/>
				</div >
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	token: state.auth.token,
	villages: state.village.villages,
	streets: state.village.streets,
	neighbours: state.profile.neighbours,
	vote: state.profile.currentVote
})

export default connect(mapStateToProps, { getSelfProfile, signOut, setNewVote })(Main)