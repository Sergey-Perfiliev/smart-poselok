import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileRepresentative from './Roles/ProfileRepresentative'
import ProfileResident from './Roles/ProfileResident'
import ProfileAdministrator from './Roles/ProfileAdministrator'

const Profile = ({ email, neighbours, vote, roles, addVote }) => {
	let voteEnabled = roles.some(role => role === 'representative')
	let isVillager = roles.some(role => role === 'representative' || role === 'resident')

	return (
		<div className='profile'>
			{
				roles.length === 0 ?
					<ProfileProcessing /> :
					roles.some(role => role === 'admin') ?
						<ProfileAdministrator
							email={email}
							neighbours={neighbours}
							enabled={voteEnabled}
							vote={vote}
							isVillager={isVillager}
							addVote={addVote}
						/> :
						roles.some(role => role === 'representative') ?
							<ProfileRepresentative
								email={email}
								neighbours={neighbours}
								enabled={voteEnabled}
								vote={vote} /> :
							roles.some(role => role === 'resident') ?
								<ProfileResident
									email={email}
									neighbours={neighbours}
									enabled={voteEnabled}
									vote={vote} /> :
								<></>
			}
		</div>
	)
}

export default Profile