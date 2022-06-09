import React, { useEffect, useState } from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileVillager from './Roles/ProfileVillager'
import AsyncAutoComplete from '../Common/SyncAutoComplete'
import ProfileManager from './Roles/ProfileManager'

const Profile = (props) => {
	const { neighbours,
		vote,
		villages,
		streets,
		createVote,
		token,
		getCurrentVote,
		currentVillage,
		currentRole,
		setCurrentVillage,
		setCurrentRole,
		addNotification,
		makeVote,
		setShowUsersData,
		requestNeighbours,
		confirmPayment,
		openGates,
		setCurrentVote
	} = props
	const { email, roles } = props.profile

	const [isVillager, setIsVillager] = useState(false)
	const [voteEnabled, setVoteEnabled] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isOwner, setIsOwner] = useState(false)

	useEffect(() => {
		// role based on current picked village
		const villageRole = roles?.length > 0
			? roles.filter(el => el?.village_id === currentVillage?.id)
			: []
		setCurrentRole(villageRole[0]?.role)

		// set role properties
		if (!!currentRole) {
			setIsVillager(!!roles.length && !!currentRole.villager)
			setVoteEnabled(isVillager && !!currentRole.villager
				? Object.keys(currentRole?.villager).some(el => el === 'Representative')
				: false
			)
			setIsAdmin(currentRole.is_admin)
			setIsOwner(currentRole.is_owner)
		}
	}, [currentVillage, currentRole, roles])

	useEffect(() => {
		if (!!currentRole && roles?.length) {
			setVoteEnabled(isVillager && !!currentRole.villager
				? Object.keys(currentRole.villager).some(el => el === 'Representative')
				: false
			)
		}
	}, [isVillager, currentRole])

	useEffect(() => {
		if (!!currentVillage?.id)
			requestNeighbours(currentVillage.id, token)
	}, [currentVillage, token])

	//current villages from available for user
	const [availableVillages, setAvailableVillages] = useState(null)
	useEffect(() => {
		const availableVillages = villages?.length > 0 && villages?.filter(v =>
			roles.map(obj => obj.village_id).includes(v.id)
		)
		setAvailableVillages(availableVillages)

		if (!currentVillage) {
			setCurrentVillage(availableVillages[0])
		}
	}, [villages, currentVillage])

	// get current vote
	useEffect(() => {
		if (!!currentVillage?.id && isVillager && token) {
			getCurrentVote(currentVillage.id, token)
		}

		return () => setCurrentVote(null)
	}, [currentVillage, isVillager, token])

	return (
		<div className='profile'>
			{
				roles.length > 1 && <div className='profile-variant'>
					<AsyncAutoComplete
						data={availableVillages}
						query={props.getVillages}
						label='Посёлок'
						value={currentVillage}
						onChange={setCurrentVillage}
						disabled={false}
						required={false}
					/>
				</div>
			}
			<div className={`profile-content${!roles.length ? 'role-processing' : ''}`}>
				{
					!roles.length && <ProfileProcessing />
				}
				{
					(isAdmin || isOwner) && !!roles.length && <ProfileManager
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						isVillager={isVillager}
						villages={villages}
						streets={streets}
						createVote={createVote}
						currentVillage={currentVillage}
						token={token}
						addNotification={addNotification}
						makeVote={makeVote}
						isAdmin={isAdmin}
						isOwner={isOwner}
						setShowUsersData={setShowUsersData}
						openGates={openGates}
						confirmPayment={confirmPayment}
					/>
				}
				{
					!isAdmin && !isOwner && !!roles.length && isVillager && <ProfileVillager
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						currentVillage={currentVillage}
						token={token}
						addNotification={addNotification}
						makeVote={makeVote}
						openGates={openGates}
					/>
				}
			</div>
		</div>
	)
}

export default Profile