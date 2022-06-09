import React, { useState } from 'react'
import CreateNewArea from '../CreateNewArea/CreateNewArea'
import CreateNewVote from '../CreateNewVote/CreateNewVote'
import ProfileAddVote from '../ProfileElements/ProfileAddVote'
import ProfileCreateNewArea from '../ProfileElements/ProfileCreateNewArea'
import ProfileFriendlyLink from '../ProfileElements/ProfileFriendlyLink'
import ProfileInfo from '../ProfileElements/ProfileInfo'
import ProfileViewUsers from '../ProfileElements/ProfileViewUsers'
import ProfileVote from '../ProfileElements/ProfileVote'
import ProfileGates from '../ProfileElements/ProfileGates'
import ProfilePrevVotes from '../ProfileElements/ProfilePrevVotes'
import ProfileUsers from '../ProfileUsers'

const ProfileManager = ({
	token,
	email,
	first_name,
	vote,
	enabled,
	villages,
	streets,
	isVillager,
	isAdmin,
	isOwner,
	neighbours,
	currentVillage,
	createVote,
	addNotification,
	makeVote,
	setShowUsersData,
	confirmPayment,
	openGates
}) => {
	const [createNewVoteMode, setCreateNewVoteMode] = useState(false)
	const [createNewAreaMode, setCreateNewAreaMode] = useState(false)

	return (
		<>
			<div>
				<div className='profile-admin-container'>
					<ProfileInfo first_name={first_name} />
					<ProfileGates openGates={openGates} />
					{isVillager && <ProfileFriendlyLink addNotification={addNotification} />}
					{
						!!vote && <ProfileVote
							vote={vote}
							enabled={enabled}
							makeVote={makeVote}
							token={token}
						/>
					}
				</div>

				<div className='profile-admin-panel'>
					{isAdmin && <ProfileAddVote setCreateNewVoteMode={setCreateNewVoteMode} />}
					{!isVillager && <ProfilePrevVotes />}
					<ProfileCreateNewArea setCreateNewAreaMode={setCreateNewAreaMode} />
					{
						isAdmin && <ProfileViewUsers
							title='Заявки жильцов'
							isAdmin={true}
							setShowUsersData={setShowUsersData}
						/>
					}
					{
						isOwner && <ProfileViewUsers
							title='Заявки администраторов'
							isOwner={true}
							setShowUsersData={setShowUsersData}
						/>
					}
				</div>
			</div>

			<div className='profile-villager-neighbours'>
				<ProfileUsers
					users={neighbours}
					confirmPayment={confirmPayment}
					isAdmin={isAdmin}
					token={token}
				/>
			</div>

			{/* MODAL WINDOWS */}
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

export default ProfileManager
