import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import { signOut } from '../../Redux/auth-reducer';
import './_header.scss'

const HeaderContainer = (props) => {
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

	if (!props.isAuth) {
		return <></>
	}

	return (
		<>
			{
				props.profile && < Header
					email={props?.profile?.email}
					showProfile={showProfile}
					setShowProfile={setShowProfile}
					{...props}
				/>
			}
		</>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile.profile
})

export default connect(mapStateToProps, { signOut })(HeaderContainer)