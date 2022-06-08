import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../Redux/auth-reducer'
import { setVotes, getVotes } from '../../Redux/vote-reducer'
import Vote from '../Vote/Vote'

const Votes = (props) => {
	React.useEffect(() => {
		props.getVotes(props?.currentVillage?.id, props?.token)

		return () => props.setVotes([])
	}, [props.currentVillage])

	const votes = props.votes
	const votesList = !!votes.length && votes.map(vote =>
		<Vote
			vote={vote}
			isColorChange={true}
			enabled={false}
			key={vote.id}
		/>
	)

	return (
		<div className='votes'>
			{votesList}
		</div>
	)
}

const mapStateToProps = (state) => ({
	token: state.auth.token,
	email: state.auth.email,
	votes: state.vote.votes,
	currentVillage: state.profile.currentVillage,
})

export default connect(mapStateToProps, { signOut, getVotes, setVotes })(Votes)