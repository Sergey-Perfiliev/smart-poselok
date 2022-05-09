import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileAdministrator from './Roles/ProfileAdministrator'
import ProfileVillager from './Roles/ProfileVillager'
import AsyncAutoComplete from '../Common/SyncAutoComplete'
import CustomAsyncSelect from '../Common/CustomAsyncSelect'

const Profile = (props) => {
	console.log('PROFILE', props)
	const { neighbours, vote, villages, streets, setNewVote } = props
	const { email, roles } = props.profile

	const availableVillages = villages.length > 0 && villages.filter(v => {
		console.log('villages', villages)
		console.log('roles', roles)
		return roles.map(obj => obj.village_id).includes(v.id)
	})
	//console.log(availableVillages[0])

	//current villages from available for user
	const [currentProfileVillage, setCurrentProfileVillage] = React.useState(availableVillages[0])

	// role based on current picked village
	const villageRole = roles?.length > 0
		? roles.filter(el => el?.village_id === currentProfileVillage?.id)
		: []
	// console.log(roles[0].village_id, currentProfileVillage?.id)

	let isVillager = !!villageRole?.length && !!villageRole[0]?.role?.villager //&& !!Object.keys(villageRole[0]?.role?.villager)
	let voteEnabled = isVillager ? Object.keys(villageRole[0]?.role?.villager) === 'representative' : false
	let isAdmin = !!villageRole[0]?.role.is_admin
	let isOwner = !!villageRole[0]?.role.is_owner

	// log
	// console.log(villageRole, isOwner, roles.length)
	console.log(villages)
	return (
		<div className='profile'>
			{
				roles.length > 1 && <div className='profile-variant'>
					<AsyncAutoComplete
						data={availableVillages}
						query={() => props.getVillages()}
						label='Посёлок'
						value={currentProfileVillage}
						onChange={setCurrentProfileVillage}
						disabled={false}
						required={false}
					/>
				</div>
			}
			<div className='profile-content'>
				{
					!roles.length && <ProfileProcessing />
				}
				{
					(isAdmin || isOwner) && !!roles.length && <ProfileAdministrator
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						isVillager={isVillager}
						villages={villages}
						streets={streets}
						setNewVote={setNewVote}
						currentVillage={currentProfileVillage}
					/>
				}
				{
					!isAdmin && !!roles.length && !!isVillager && <ProfileVillager
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						currentVillage={currentProfileVillage}
					/>
				}
			</div>
		</div>
	)
}

export default Profile