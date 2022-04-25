import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileRepresentative from './Roles/ProfileRepresentative'
import ProfileResident from './Roles/ProfileResident'

const Profile = ({ email, neighbours, vote, roles }) => {
	let voteEnabled = roles.some(role => role === 'representative')

	return (
		<div className='profile'>
			{
				roles.length === 0 ?
					<ProfileProcessing></ProfileProcessing> :
					roles.some(role => role === 'resident') ?
						<ProfileResident
							email={email}
							neighbours={neighbours}
							enabled={voteEnabled}
							vote={vote}>
						</ProfileResident> :
						roles.some(role => role === 'representative') ?
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