import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../Assets/house.svg';
import './_header.scss'

const Header = ({ email, signOut, showProfile, setShowProfile }) => {
	return (
		<header className='header'>
			<div className='header__comp-info'>
				<Link to={'/'}>
					<ReactLogo width='60px' height='60px' />
				</Link>
				<Link className='header__logo' to={'/'}>Smart Poselok</Link>
			</div>

			<div className='header__icon-container'>
				<div className='header__icon-info' onClick={() => setShowProfile(!showProfile)}>
					<button className='header__icon-btn btn btn-primary'>{email[0]?.toUpperCase()}</button>
					<span className='dropdown-caret'></span>
				</div>
				{
					showProfile && (
						<div className='profile-menu-container'>
							<div className='profile-menu'>
								<div className='profile-menu-container-group profile-menu-info'>
									Авторизовались как
									<span> {email}</span>
								</div>
								<div className='profile-menu-container-group profile-menu-actions'>
									<button className='btn btn-menu-profile' onClick={() => signOut()}>Выйти</button>
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