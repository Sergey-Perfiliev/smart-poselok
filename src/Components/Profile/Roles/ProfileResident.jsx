import React from 'react'
import ProfileFriendlyLink from '../ProfileFriendlyLink'
import ProfileInfo from '../ProfileInfo'
import ProfileNeighbours from '../ProfileNeighbours'
import ProfileVote from '../ProfileVote'

const ProfileResident = ({ email, vote, neighbours, enabled }) => {
	return (
		<>
			<div className='profile-villager-container'>
				<ProfileInfo email={email} />
				<ProfileFriendlyLink />
				<ProfileVote vote={vote} enabled={enabled} />
			</div>

			<ProfileNeighbours neighbours={neighbours} />
		</>
	)
}

export default ProfileResident