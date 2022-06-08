import React from 'react'

const ProfileGates = ({ openGates }) => {
	return (
		<div className='profile__content-el profile__content-el-minimize profile__new-area'>
			<div className='profile__content-el__header profile__new-vote-header'>
				<h3 className='profile__content-el__title profile__new-vote-title'>Открыть ворота</h3>
			</div>
			<div className='profile__content-el__content'>
				<button className='btn btn-profile btn-new-vote' onClick={() => openGates()}>Открыть</button>
			</div>
		</div>
	)
}

export default ProfileGates