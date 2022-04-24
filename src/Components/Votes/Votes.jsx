import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../Redux/auth-reducer'
import Header from '../Header/Header'
import Vote from '../Vote/Vote'

const Votes = (props) => {
	const votes = props.votes
	const votesList = votes.length && votes.map(vote =>
		<Vote
			vote={vote}
			isColorChange={true}
			enabled={false}
			key={vote.id * Math.random()}
		/>
	)

	return (
		<>
			<Header
				email={props.email}
				signOut={props.signOut}
			/>
			<div className='votes'>
				{votesList}
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	votes: state.profile.votes
})

export default connect(mapStateToProps, { signOut })(Votes)