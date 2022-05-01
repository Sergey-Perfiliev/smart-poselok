import React from 'react'

const ProfileFriendlyLink = (props) => {
	const handleCopy = (e) => {
		try {
			e.preventDefault()
			let copyText = document.getElementsByClassName('profile__friendly-link-url')[0].textContent
			navigator.clipboard.writeText(copyText)
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='profile__friendly-link'>
			<h3 className='profile__friendly-link-title'>Ссылка</h3>
			<div>
				<p className='profile__friendly-link-url'>
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