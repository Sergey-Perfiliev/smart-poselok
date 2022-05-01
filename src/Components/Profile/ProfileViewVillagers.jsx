import React from 'react'
import { Link } from 'react-router-dom'

const ProfileViewVillagers = () => {
	return (
		<div className='profile__view-villagers'>
			<div className='profile__view-villagers-header'>
				<h3 className='profile__view-villagers-title'>Жильцы</h3>
				<Link to="/villagers" className='btn btn-profile btn-view-villagers'>Посмотреть</Link>
			</div>
		</div>
	)
}

export default ProfileViewVillagers