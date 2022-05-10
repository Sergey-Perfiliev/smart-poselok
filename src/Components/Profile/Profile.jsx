import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileAdministrator from './Roles/ProfileAdministrator'
import ProfileVillager from './Roles/ProfileVillager'
import AsyncAutoComplete from '../Common/SyncAutoComplete'

const Profile = (props) => {
	console.log('PROFILE', props)
	const { neighbours,
		vote,
		villages,
		streets,
		createVote,
		token,
		getCurrentVote,
		setCurrentVillage,
		currentVillage
	} = props
	const { email, roles } = props.profile

	// const availableVillages = villages.length > 0 && villages.filter(v => {
	// 	return roles.map(obj => obj.village_id).includes(v.id)
	// })

	const [availableVillages, setAvailableVillages] = React.useState(null)

	//current villages from available for user
	React.useEffect(() => {
		const availableVillages = villages?.length > 0 && villages?.filter(v => {
			return roles.map(obj => obj.village_id).includes(v.id)
		})

		setAvailableVillages(availableVillages)
		setCurrentVillage(availableVillages[0])
	}, [])

	// const [currentProfileVillage, setCurrentProfileVillage] = React.useState(availableVillages[0])
	React.useEffect(() => {
		if (!!currentVillage?.id) {
			getCurrentVote(currentVillage.id, token)
		}
	}, [currentVillage])

	// role based on current picked village
	const villageRole = roles?.length > 0
		? roles.filter(el => el?.village_id === currentVillage?.id)
		: []

	let isVillager = !!villageRole?.length && !!villageRole[0]?.role?.villager //&& !!Object.keys(villageRole[0]?.role?.villager)
	let voteEnabled = isVillager ? Object.keys(villageRole[0]?.role?.villager) === 'representative' : false
	let isAdmin = !!villageRole[0]?.role.is_admin
	let isOwner = !!villageRole[0]?.role.is_owner

	return (
		<div className='profile'>
			{
				roles.length > 1 && <div className='profile-variant'>
					<AsyncAutoComplete
						data={availableVillages}
						query={() => props.getVillages()}
						label='Посёлок'
						value={currentVillage}
						onChange={setCurrentVillage}
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
						createVote={createVote}
						currentVillage={currentVillage}
						token={token}
					/>
				}
				{
					!isAdmin && !!roles.length && !!isVillager && <ProfileVillager
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						currentVillage={currentVillage}
						token={token}
					/>
				}
			</div>
		</div>
	)
}

export default Profile