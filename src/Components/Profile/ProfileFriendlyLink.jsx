import React from 'react'

const ProfileFriendlyLink = (props) => {
	return (
		<div className='profile__friendly-link'>
			<h3 className='profile__friendly-link-title'>Link</h3>
			<div>
				<p className='profile__friendly-link-url'>
					https://smartposelok/invite/code=?gnauisxb
				</p>
				<button className='btn btn-link'>Copy</button>
			</div>
		</div>
	)
}

export default ProfileFriendlyLink