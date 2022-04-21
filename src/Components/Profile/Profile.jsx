import React from 'react'
import Vote from '../Vote/Vote'
import './_profile.scss'

const Profile = ({ email, neighbours, vote }) => {
	const neighboursList = neighbours && neighbours.map((neighbour) =>
		<NeighbourEl neighbour={neighbour} key={neighbour.id} />
	)

	return (
		<div className='profile'>
			<div>
				<div className='profile__info'>
					<div className='profile__info-icon'>

					</div>
					<div className='profile__info-content'>
						<div>
							<h2 className='profile__info-name'>{email}</h2><span>(Emoji)</span>
						</div>
						<h4 className='profile__info-payment'>Last payment: 19.04.2022</h4>
					</div>
				</div>
				<div className='profile__friendly-link'>
					<h3 className='profile__friendly-link-title'>Link</h3>
					<div>
						<p className='profile__friendly-link-url'>
							https://smartposelok/invite/code=?gnauisxb
						</p>
						<button className='btn btn-link'>Copy</button>
					</div>
				</div>
				{
					vote.id && <div className='profile__vote'>
						<h3 className='profile__vote-title'>Current vote</h3>
						<Vote vote={vote} />
					</div>
				}
			</div>

			{
				neighbours.length > 0 ? <div className='profile__neighbours'>
					{neighboursList}
				</div> : <div>У вас нет соседей</div>
			}
		</div>
	)
}

const NeighbourEl = ({ neighbour }) => {
	return (
		<div className='profile__neighbours-el'>
			<div className='profile__neighbours-el__icon'></div>
			<h5>{neighbour.name}</h5><span>(Emoji)</span>
		</div>
	)
}

export default Profile