import React, { useState } from 'react'
import RadioInput from './RadioInput';
import './_vote.scss'

const Vote = (props) => {
	// console.log(props.vote)
	let { id, topic, status, options, voted } = props.vote
	let { makeVote, token } = props
	
	const [selected, setSelected] = useState(voted || null);
	const [submitted, setSubmitted] = useState(!!voted || false)
	// console.log("VOTED", voted, !!voted, props.vote)

	let totalVotes = null;

	if (status === 'finished') {
		totalVotes = options && options.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.votes_number
		}, 0)
	}

	// count numbers after ,
	const f = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));

	const countVotesPercent = (val, total) => {
		const percent = (val / total * 100)
		return f(percent) > 0
			? percent.toFixed(1)
			: percent.toFixed(0)
	}

	let voteClassName = 'vote'
	if (props.enabled) voteClassName += ' vote-enabled'
	else voteClassName += ' vote-disabled'

	if (props.isColorChange && props.enabled) voteClassName += ' vote-white'
	// console.log(makeVote)

	const optionList = props.vote && options.map(option =>
		<RadioInput
			value={option.id}
			text={option.description}
			selected={selected}
			onChange={setSelected}
			submitted={submitted}
			setSubmitted={setSubmitted}
			enabled={props.enabled}
			isActive={status === 'active'}
			votedPercent={countVotesPercent(option.votes_number, totalVotes)}
			key={option.id}
			voteId={id}
			makeVote={makeVote}
			token={token}
		/>
	)

	return (
		<div className={voteClassName}>
			<h4 className='vote-title'>{topic}</h4>
			{optionList}
		</div>
	)
}

export default Vote