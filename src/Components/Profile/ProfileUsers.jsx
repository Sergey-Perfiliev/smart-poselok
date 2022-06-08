import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DangerousIcon from '@mui/icons-material/Dangerous';

const ProfileUsers = ({ users, isAdmin, confirmPayment, token }) => {
	const [representativeValue, setRepresentativeValue] = useState('')
	const handleRepresentativeValueChange = (e) => {
		setRepresentativeValue(e.target.value)
	}

	// filter users by fullname
	const usersList = users && users
		.filter(n => `${n.representative_second_name} ${n.representative_first_name} ${n.representative_patronymic}`
			.toLowerCase()
			.includes(representativeValue.toLowerCase())
		)
		.map(user => <UserEl user={user} key={user.user_id} isAdmin={isAdmin} confirmPayment={confirmPayment} token={token} />)

	return (
		<>
			<SearchBar
				value={representativeValue}
				handleChange={handleRepresentativeValueChange}
			/>
			{
				!!users && <div className='profile__neighbours'>
					{
						usersList.length > 0
							? usersList
							: <div style={{ margin: '16px', fontSize: '20px' }}>Представители отсутствуют.</div>
					}
				</div>
			}
		</>
	)
}

const UserEl = ({ user, isAdmin, confirmPayment, token }) => {
	return (
		<div className='profile__neighbours-el'>
			<div className='profile__neighbours-el__icon'></div>
			<h5>{user.representative_second_name}</h5>
			<h5>{user.representative_first_name}</h5>
			<h5>{user.representative_patronymic}</h5>
			{
				user.status.toLowerCase() === 'decent'
					? <CheckCircleIcon fontSize='small' style={{ color: '#00cc66' }} />
					: user.status.toLowerCase() === 'careless'
						? <DoDisturbIcon fontSize='small' style={{ color: '#afafaf' }} />
						: user.status.toLowerCase() === 'dishonest'
							? <DangerousIcon fontSize='small' style={{ color: '#cc0000' }} />
							: null
			}
			{
				isAdmin && user.status === 'dishonest' && <button
					className='btn btn-profile btn-neighbours'
					onClick={() => confirmPayment(user.land_plot_id, user.user_id, token)}
				>Оплата</button>
			}
		</div>
	)
}

export default ProfileUsers