import React from 'react'

const ProfileNeighbours = ({ neighbours }) => {
	const neighboursList = neighbours && neighbours.map((neighbour) =>
		<NeighbourEl neighbour={neighbour} key={neighbour.id} />
	)

	return (
		<>
			{
				neighbours.length > 0 ? <div className='profile__neighbours'>
					{neighboursList}
				</div> : <div>У вас нет соседей</div>
			}
		</>
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

export default ProfileNeighbours