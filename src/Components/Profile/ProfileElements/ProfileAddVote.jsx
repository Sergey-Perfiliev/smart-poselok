import React from 'react'

const ProfileAddVote = ({ setCreateNewVoteMode }) => {
	return (
		<div className='profile__content-el profile__content-el-minimize profile__new-vote'>
			<div className='profile__content-el__header profile__new-vote__header'>
				<h3 className='profile__content-el__title profile__new-vote__title'>Новое голосование</h3>
			</div>
			<div className='profile__content-el__content'>
				<button className='btn btn-profile btn-new-vote' onClick={() => setCreateNewVoteMode(true)}>Создать</button>
			</div>
		</div>
	)
}

export default ProfileAddVote