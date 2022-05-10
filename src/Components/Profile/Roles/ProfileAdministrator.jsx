import React, { useState } from 'react'
import CreateNewArea from '../CreateNewArea/CreateNewArea'
import CreateNewVote from '../CreateNewVote/CreateNewVote'
import ProfileAddVote from '../ProfileAddVote'
import ProfileCreateNewArea from '../ProfileCreateNewArea'
import ProfileFriendlyLink from '../ProfileFriendlyLink'
import ProfileInfo from '../ProfileInfo'
import ProfileNeighbours from '../ProfileNeighbours'
import ProfileViewVillagers from '../ProfileViewVillagers'
import ProfileVote from '../ProfileVote'

const ProfileAdministrator = (props) => {
	const {
		token,
		email,
		vote,
		enabled,
		villages,
		streets,
		isVillager,
		neighbours,
		currentVillage,
		createVote,
		addNotification,
		makeVote
	} = props

	const [createNewVoteMode, setCreateNewVoteMode] = useState(false)
	const [createNewAreaMode, setCreateNewAreaMode] = useState(false)

	return (
		<>
			<div className='profile-admin-container'>
				<ProfileInfo email={email} />
				{isVillager && <ProfileFriendlyLink addNotification={addNotification} />}
				{
					vote && <ProfileVote
						vote={vote}
						enabled={enabled}
						makeVote={makeVote}
						token={token}
					/>
				}
			</div>

			<div className='profile-admin-panel'>
				<ProfileAddVote setCreateNewVoteMode={setCreateNewVoteMode} />
				<ProfileCreateNewArea setCreateNewAreaMode={setCreateNewAreaMode} />
				<ProfileViewVillagers />
			</div>

			{isVillager && <ProfileNeighbours neighbours={neighbours} />}
			{
				createNewVoteMode && <CreateNewVote
					createVote={createVote}
					createNewVoteMode={createNewVoteMode}
					setCreateNewVoteMode={setCreateNewVoteMode}
					currentVillage={currentVillage}
					token={token}
				/>
			}
			{
				createNewAreaMode && !!currentVillage && <CreateNewArea
					villages={villages}
					streets={streets}
					createNewAreaMode={createNewAreaMode}
					setCreateNewAreaMode={setCreateNewAreaMode}
					currentVillage={currentVillage}
				/>
			}
		</>
	)
}

export default ProfileAdministrator