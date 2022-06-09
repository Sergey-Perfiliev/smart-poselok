import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../Redux/auth-reducer'
import { setVotes, getVotes, makeVote } from '../../Redux/vote-reducer'
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
			enabled={!!props.currentRole?.villager && vote.status === 'active'}
			key={vote.id}
			makeVote={props.makeVote}
			token={props.token}
		/>
	)

	return (
		<div className='votes'>
			{votesList?.length > 0
				? votesList.reverse()
				: <h2 style={{ fontWeight: '400', marginLeft: '24px' }}>В данном посёлке ещё не проводились голосования.</h2>}
		</div>
	)
}

const mapStateToProps = (state) => ({
	token: state.auth.token,
	email: state.auth.email,
	votes: state.vote.votes,
	currentVillage: state.profile.currentVillage,
	currentRole: state.profile.currentRole
})

export default connect(mapStateToProps, { signOut, getVotes, setVotes, makeVote })(Votes)