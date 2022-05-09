import React from 'react'

const ProfileInfo = ({ email, isShowPayed = false }) => {
	return (
		<div className='profile__info'>
			<div className='profile__info-icon'>

			</div>
			<div className={`profile__info-content ${ !isShowPayed && 'mt-16px' }`}>
				<div>
					<h2 className='profile__info-name'>{email}</h2>
				</div>
				{ isShowPayed && <h4 className='profile__info-payment'>Последняя оплата: 19.04.2022</h4> }
			</div>
		</div>
	)
}

export default ProfileInfo