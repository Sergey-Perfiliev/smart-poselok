import React from 'react'

const ProfileCreateNewArea = ({ setCreateNewAreaMode }) => {
	return (
		<div className='profile__content-el profile__content-el-minimize profile__new-area'>
			<div className='profile__content-el__header profile__new-vote-header'>
				<h3 className='profile__content-el__title profile__new-vote-title'>Создать новую землю</h3>
			</div>
			<div className='profile__content-el__content'>
				<button className='btn btn-profile btn-new-vote' onClick={() => setCreateNewAreaMode(true)}>Создать</button>
			</div>
		</div>
	)
}

export default ProfileCreateNewArea