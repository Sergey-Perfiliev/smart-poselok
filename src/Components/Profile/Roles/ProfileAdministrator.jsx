import React, { useState } from 'react'
import CreateNewVote from '../CreateNewVote/CreateNewVote'
import ProfileAddVote from '../ProfileAddVote'
import ProfileFriendlyLink from '../ProfileFriendlyLink'
import ProfileInfo from '../ProfileInfo'
import ProfileNeighbours from '../ProfileNeighbours'
import ProfileViewVillagers from '../ProfileViewVillagers'
import ProfileVote from '../ProfileVote'

const ProfileAdministrator = ({ email, vote, enabled, isVillager, neighbours, addVote }) => {
	const [createNewVoteMode, setCreateNewVoteMode] = useState(false)

	return (
		<>
			<div className='profile-admin-container'>
				<ProfileInfo email={email} />
				{isVillager && <ProfileFriendlyLink />}
				<ProfileVote vote={vote} enabled={enabled} />
			</div>

			<div className='profile-admin-panel'>
				<ProfileAddVote setCreateNewVoteMode={setCreateNewVoteMode} />
				<ProfileViewVillagers />
			</div>

			{isVillager && <ProfileNeighbours neighbours={neighbours} />}
			{
				createNewVoteMode && <CreateNewVote addVote={addVote} createNewVoteMode={createNewVoteMode} setCreateNewVoteMode={setCreateNewVoteMode} />
			}
		</>
	)
}

export default ProfileAdministrator