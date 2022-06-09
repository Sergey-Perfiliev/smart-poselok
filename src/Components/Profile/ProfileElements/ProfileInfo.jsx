import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProfileInfo = ({ email, first_name, isShowPayed = true }) => {
	let infoContentClassName = 'profile__info-content'
	let infoName = 'profile__info-name' 
	!isShowPayed
		? infoContentClassName += ' mt-16'
		: infoName += ' mb-8'
		
	return (
		<div className='profile__info'>
			<div className='profile__info-icon'>

			</div>
			<div className={`${infoContentClassName}`}>
				<h2 className={`${infoName}`}>{first_name}</h2>
				<h4 className='profile__info-payment'>
					Статус оплаты:
					<CheckCircleIcon fontSize='small' style={{ color: '#00cc66' }} />
				</h4>
				{/* {isShowPayed && <h4 className='profile__info-payment'>Последняя оплата: 19.04.2022</h4>} */}
			</div>
		</div>
	)
}

export default ProfileInfo