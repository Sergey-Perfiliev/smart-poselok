import React from 'react'
import { Link } from 'react-router-dom'

const ProfileViewVillagers = () => {
	return (
		<div className='profile__content-el profile__view-villagers'>
			<div className='profile__view-villagers__header'>
				<h3 className='profile__content-el__title profile__view-villagers__title'>Жильцы</h3>
			</div>
			<div className='profile__content-el__content'>
				<Link to="/villagers" className='btn btn-profile btn-view-villagers'>Посмотреть</Link>
			</div>
		</div>
	)
}

export default ProfileViewVillagers