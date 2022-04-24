import React from 'react'

const ProfileFriendlyLink = (props) => {
	return (
		<div className='profile__friendly-link'>
			<h3 className='profile__friendly-link-title'>Ссылка</h3>
			<div>
				<p className='profile__friendly-link-url'>
					https://smartposelok/invite/code=?gnauisxb
				</p>
				<button className='btn btn-link'>Скопировать</button>
			</div>
		</div>
	)
}

export default ProfileFriendlyLink