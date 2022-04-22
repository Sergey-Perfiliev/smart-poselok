import React from 'react'
import ProfileFriendlyLink from './ProfileFriendlyLink'
import ProfileInfo from './ProfileInfo'
import ProfileNeighbours from './ProfileNeighbours'
import ProfileProcessing from './ProfileProcessing'
import ProfileVote from './ProfileVote'
import './_profile.scss'

const Profile = ({ email, neighbours, vote, role }) => {
	return (
		<div className='profile'>
			{
				role.some(role => role === 'processing') ?
					<ProfileProcessing></ProfileProcessing> :
					(
						<>
							<div>
								<ProfileInfo email={email} />
								<ProfileFriendlyLink />
								<ProfileVote vote={vote} />
							</div>

							<ProfileNeighbours neighbours={neighbours} />
						</>
					)
			}
		</div>
	)
}

export default Profile