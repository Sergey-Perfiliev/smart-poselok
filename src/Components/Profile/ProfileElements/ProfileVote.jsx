import React from 'react'
import { Link } from 'react-router-dom'
import Vote from '../../Vote/Vote'

const ProfileVote = ({ vote, enabled, makeVote, token }) => {
	console.log(vote, enabled)
	return (
		<>
			<div className='profile__content-el profile__vote'>
				<div className='profile__content-el__header profile__vote__header'>
					<h3 className='profile__content-el__title profile__vote__title'>Текущее голосование</h3>
					<Link to="/votes">Посмотреть предыдущие</Link>
				</div>
				<div className='profile__content-el__content'>
					<Vote vote={vote} enabled={enabled} makeVote={makeVote} token={token} />
				</div>
			</div>
		</>
	)
}

export default ProfileVote