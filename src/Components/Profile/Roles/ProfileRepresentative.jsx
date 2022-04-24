import React from 'react'
import ProfileFriendlyLink from '../ProfileFriendlyLink'
import ProfileInfo from '../ProfileInfo'
import ProfileNeighbours from '../ProfileNeighbours'
import ProfileVote from '../ProfileVote'

const ProfileRepresentative = ({ email, vote, neighbours, enabled }) => {
	return (
		<>
			<div>
				<ProfileInfo email={email} />
				<ProfileFriendlyLink />
				<ProfileVote vote={vote} enabled={enabled} />
			</div>

			<ProfileNeighbours neighbours={neighbours} />
		</>
	)
}

export default ProfileRepresentative