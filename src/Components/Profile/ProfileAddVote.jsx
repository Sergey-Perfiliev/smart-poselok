import React from 'react'

const ProfileAddVote = ({ setCreateNewVoteMode }) => {
	return (
		<div className='profile__new-vote'>
			<div className='profile__new-vote-header'>
				<h3 className='profile__new-vote-title'>Новое голосование</h3>
				<button className='btn btn-profile btn-new-vote' onClick={() => setCreateNewVoteMode(true)}>Создать</button>
			</div>
		</div>
	)
}

export default ProfileAddVote