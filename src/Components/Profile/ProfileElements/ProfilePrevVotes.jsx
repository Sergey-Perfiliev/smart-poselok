import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePrevVotes = (props) => {
	return (
		<div className='profile__content-el profile__content-el-minimize'>
			<div className='profile__content-el__header'>
				<h3 className='profile__content-el__title'>Предыдущие голосования</h3>
			</div>
			<div className='profile__content-el__content'>
				<Link to="/votes" className='btn btn-profile'>Посмотреть</Link>
			</div>
		</div>
	)
}

export default ProfilePrevVotes