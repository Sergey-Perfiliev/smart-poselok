import React from 'react'
import { Link } from 'react-router-dom'

const ProfileViewUsers = ({ title, isAdmin = false, isOwner = false, setShowUsersData }) => {
	const onRedirect = () => {
		if (isAdmin) {
			setShowUsersData('villagers')
		}
		if (isOwner) {
			setShowUsersData('admins')
		}
	}

	return (
		<div className='profile__content-el profile__content-el-minimize profile__view-villagers'>
			<div className='profile__content-el__header profile__view-villagers__header'>
				<h3 className='profile__content-el__title profile__view-villagers__title'>{title}</h3>
			</div>
			<div className='profile__content-el__content'>
				<Link to="/pending" onClick={onRedirect} className='btn btn-profile btn-view-villagers'>Посмотреть</Link>
			</div>
		</div>
	)
}

export default ProfileViewUsers