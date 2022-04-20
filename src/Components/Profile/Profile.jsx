import React from 'react'
import './_profile.scss'

const Profile = ({ email, neighbours }) => {
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
			</div>

			<div className='profile__neighbours'>
				{neighboursList}
			</div>
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