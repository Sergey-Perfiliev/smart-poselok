import React from 'react'
import ProfileProcessing from './Roles/ProfileProcessing'
import './_profile.scss'
import ProfileAdministrator from './Roles/ProfileAdministrator'
import ProfileVillager from './Roles/ProfileVillager'
import SyncAutoComplete from '../Common/SyncAutoComplete'

const Profile = (props) => {
	const { neighbours, vote, villages, streets, setNewVote } = props
	const { email, roles } = props.profile
	const [currentProfileVillage, setCurrentProfileVillage] = React.useState(villages[0])
	console.log(villages)
	const villageRole = roles.filter(el => el.village_id === currentProfileVillage.id)[0]
	let isVillager = !!villageRole.role.villager && !!Object.keys(villageRole.role.villager)
	let voteEnabled = isVillager ? Object.keys(villageRole.role.villager)[0] === 'representative' : false
	let isAdmin = villageRole.role.is_admin
	
	return (
		<div className='profile'>
			{
				roles.length > 1 && <div className='profile-variant'>
					<SyncAutoComplete
						data={villages}
						defaultValue={villages[0]}
						onChange={setCurrentProfileVillage}
						label='Посёлок'
						disableClearable={true}
						required={false}
					/>
				</div>
			}
			<div className='profile-content'>
				{
					!roles.length && <ProfileProcessing />
				}
				{
					isAdmin && <ProfileAdministrator
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
						isVillager={isVillager}
						villages={villages}
						streets={streets}
						setNewVote={setNewVote}
					/>
				}
				{
					!isAdmin && isVillager && <ProfileVillager
						email={email}
						neighbours={neighbours}
						enabled={voteEnabled}
						vote={vote}
					/>
				}
			</div>
		</div>
	)
}

export default Profile