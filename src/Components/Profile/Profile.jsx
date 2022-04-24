import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileRepresentative from './Roles/ProfileRepresentative'
import ProfileResident from './Roles/ProfileResident'

const Profile = ({ email, neighbours, vote, role }) => {
	let voteEnabled = role.some(r => r === 'representative')

	return (
		<div className='profile'>
			{
				role.some(role => role === 'processing') ?
					<ProfileProcessing></ProfileProcessing> :
					role.some(role => role === 'resident') ?
						<ProfileResident
							email={email}
							neighbours={neighbours}
							enabled={voteEnabled}
							vote={vote}>
						</ProfileResident> :
						role.some(role => role === 'representative') ?
							<ProfileRepresentative
								email={email}
								neighbours={neighbours}
								enabled={voteEnabled}
								vote={vote}>
							</ProfileRepresentative> :
							<></>
			}
		</div>
	)
}

export default Profile