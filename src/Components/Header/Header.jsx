import React, { useState, useEffect } from 'react'
import { ReactComponent as ReactLogo } from '../../Assets/house.svg';
import './_header.scss'

const Header = ({ email, signOut }) => {
	const [showProfile, setShowProfile] = useState(false)

	useEffect(() => {
		document.addEventListener('click', closeProfileMenu, true)
		return () => {
			document.removeEventListener('click', closeProfileMenu, true);
		}
	})

	const closeProfileMenu = (e) => {
		if (!e.target.closest('.profile-menu-container') && !e.target.closest('.header__icon-info'))
			setShowProfile(false)
	}

	return (
		<header className='header'>
			<div className='header__comp-info'>
				<ReactLogo width='60px' height='60px' />
				<h2 className='header__logo'>Smart Poselok</h2>
			</div>

			<div className='header__icon-container'>
				<div className='header__icon-info' onClick={() => setShowProfile(!showProfile)}>
					<button className='header__icon-btn btn btn-primary'>{email[0].toUpperCase()}</button>
					<span className='dropdown-caret'></span>
				</div>
				{
					showProfile && (
						<div className='profile-menu-container'>
							<div className='profile-menu'>
								<div className='profile-menu-container-group profile-menu-info'>
									Sign in as
									<span> {email}</span>
								</div>
								<div className='profile-menu-container-group profile-menu-actions'>
									<button className='btn btn-menu-profile' onClick={() => signOut()}>Sign out</button>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</header>
	)
}

export default Header