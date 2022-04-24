import React from 'react'
import { Link } from 'react-router-dom'
import Vote from '../Vote/Vote'

const ProfileVote = ({ vote, enabled }) => {
	return (
		<>
			{
				vote.id && <div className='profile__vote'>
					<div className='profile__vote-header'>
						<h3 className='profile__vote-title'>Текущее голосование</h3>
						<Link to="/votes">Посмотреть предыдущие</Link>
					</div>
					<Vote vote={vote} enabled={enabled} />
				</div>
			}
		</>
	)
}

export default ProfileVote