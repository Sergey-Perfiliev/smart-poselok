import React from 'react'

const ProfileInfo = ({email}) => {
	return (
		<div className='profile__info'>
			<div className='profile__info-icon'>

			</div>
			<div className='profile__info-content'>
				<div>
					<h2 className='profile__info-name'>{email}</h2><span>(Emoji)</span>
				</div>
				<h4 className='profile__info-payment'>Last payment: 19.04.2022</h4>
			</div>
		</div>
	)
}

export default ProfileInfo