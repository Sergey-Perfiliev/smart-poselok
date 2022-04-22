import React from 'react'
import Loader from '../Common/Loader'

const ProfileProcessing = () => {
	return (
		<div className='profile-processing'>
			<h2>Профиль в обработке. Ожидается подтверждение!</h2>
			<Loader width={48} />
		</div>
	)
}

export default ProfileProcessing