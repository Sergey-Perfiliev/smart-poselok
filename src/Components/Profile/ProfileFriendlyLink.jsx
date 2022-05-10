import React from 'react'

const ProfileFriendlyLink = (props) => {
	const handleCopy = (e) => {
		try {
			e.preventDefault()
			let copyText = document.getElementsByClassName('profile__friendly-link__url')[0].textContent
			navigator.clipboard.writeText(copyText)
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='profile__content-el profile__friendly-link'>
			<h3 className='profile__content-el__title profile__friendly-link__title'>Ссылка</h3>
			<div className='profile__content-el__content profile__friendly-link__content'>
				<p className='profile__friendly-link__url '>
					https://smartposelok/invite/code=?gnauisxb
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