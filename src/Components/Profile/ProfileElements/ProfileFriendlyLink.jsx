import React from 'react'

const ProfileFriendlyLink = (props) => {
	// copy text from element by class to clipboard
	const handleCopy = (e) => {
		try {
			e.preventDefault()
			let copyText = document.getElementsByClassName('profile__friendly-link__url')[0].textContent
			navigator.clipboard.writeText(copyText)
			props.addNotification("SUCCESS", "Скопировано")
		}
		catch (error) {
			props.addNotification("ERROR", "Ошибка")
		}
	}

	return (
		<div className='profile__content-el profile__friendly-link'>
			<div className='profile__content-el__header profile__friendly-link__header'>
				<h3 className='profile__content-el__title profile__friendly-link__title'>Ссылка</h3>
			</div>
			<div className='profile__content-el__content profile__friendly-link__content'>
				<p className='profile__friendly-link__url '>
					https://smart-poselok.vercel.app/login
				</p>
				<button
					className='btn btn-profile btn-friendly-link'
					onClick={(e) => handleCopy(e)}
				>Скопировать</button>
			</div>
		</div>
	)
}

export default ProfileFriendlyLink