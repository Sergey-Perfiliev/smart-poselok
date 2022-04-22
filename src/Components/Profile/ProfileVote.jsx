import React from 'react'
import Vote from '../Vote/Vote'

const ProfileVote = ({vote}) => {
	return (
		<>
			{
				vote.id && <div className='profile__vote'>
					<h3 className='profile__vote-title'>Current vote</h3>
					<Vote vote={vote} />
				</div>
			}
		</>
	)
}

export default ProfileVote