import React, { useEffect, useState } from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileVillager from './Roles/ProfileVillager'
import AsyncAutoComplete from '../Common/SyncAutoComplete'
import ProfileManager from './Roles/ProfileManager'
import CustomAsyncSelect from '../Common/CustomAsyncSelect'

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
		setCurrentVote,
		setNeighbours
	} = props
	const { email, first_name, roles } = props.profile

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

		return () => setNeighbours([])
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
					<CustomAsyncSelect
						data={availableVillages}
						value={currentVillage}
						onChange={setCurrentVillage}
						query={props.getVillages}
					/>
				</div>
			}
			<div className={`profile-content${!roles.length ? 'role-processing' : ''}`}>
				{
					!roles.length && <ProfileProcessing />
				}
				{
					(isAdmin || isOwner) && !!roles.length && <ProfileManager
						token={token}
						first_name={first_name}
						isOwner={isOwner}
						isVillager={isVillager}
						isAdmin={isAdmin}
						neighbours={neighbours}
						confirmPayment={confirmPayment}
						vote={vote}
						enabled={voteEnabled}
						createVote={createVote}
						makeVote={makeVote}
						villages={villages}
						streets={streets}
						currentVillage={currentVillage}
						setShowUsersData={setShowUsersData}
						openGates={openGates}
						addNotification={addNotification}
					/>
				}
				{
					!isAdmin && !isOwner && !!roles.length && isVillager && <ProfileVillager
						token={token}
						first_name={first_name}
						neighbours={neighbours}
						vote={vote}
						enabled={voteEnabled}
						makeVote={makeVote}
						currentVillage={currentVillage}
						openGates={openGates}
						addNotification={addNotification}
					/>
				}
			</div>
		</div>
	)
}

export default Profile