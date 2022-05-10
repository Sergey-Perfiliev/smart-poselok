import React from 'react'
import ProfileFriendlyLink from '../ProfileFriendlyLink'
import ProfileInfo from '../ProfileInfo'
import ProfileNeighbours from '../ProfileNeighbours'
import ProfileVote from '../ProfileVote'

const ProfileVillager = ({ email, vote, neighbours, enabled, makeVote, token }) => {
	return (
		<>
			<div className='profile-villager-container'>
				<ProfileInfo email={email} />
				<ProfileFriendlyLink />
				<ProfileVote vote={vote} enabled={enabled} makeVote={makeVote} token={token} />
			</div>

			<ProfileNeighbours neighbours={neighbours} />
		</>
	)
}

export default ProfileVillager