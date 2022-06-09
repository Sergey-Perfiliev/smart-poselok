import React from 'react'
import ProfileFriendlyLink from '../ProfileElements/ProfileFriendlyLink'
import ProfileInfo from '../ProfileElements/ProfileInfo'
import ProfileVote from '../ProfileElements/ProfileVote'
import ProfileGates from '../ProfileElements/ProfileGates'
import ProfileUsers from '../ProfileUsers'

const ProfileVillager = ({ email, first_name, vote, neighbours, enabled, makeVote, openGates, token, addNotification }) => {
	return (
		<>
			<div className='profile-villager-container'>
				<ProfileInfo first_name={first_name} />
				<ProfileGates openGates={openGates} />
				<ProfileFriendlyLink addNotification={addNotification} />
				{
					vote && <ProfileVote
						vote={vote}
						enabled={enabled}
						makeVote={makeVote}
						token={token}
					/>
				}
			</div>

			<div className='profile-villager-neighbours'>
				<ProfileUsers users={neighbours} />
			</div>
		</>
	)
}

export default ProfileVillager