import React, { useState } from 'react'
import RadioInput from './RadioInput';
import './_vote.scss'

// count numbers after ,
const f = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));

const countVotesPercent = (val, total) => {
	const percent = (val / total * 100)
	return f(percent) > 0
		? percent.toFixed(1)
		: percent.toFixed(0)
}

const Vote = (props) => {
	let { id, topic, status, options, voted } = props.vote
	let { makeVote, token } = props

	const [selected, setSelected] = useState(voted);
	const [submitted, setSubmitted] = useState(!!voted)
	const [totalVotes, setTotalVotes] = useState(null)

	let voteStatus = status === 'active'

	React.useEffect(() => {
		if (status === 'finished') {
			setTotalVotes(
				options?.reduce((accumulator, currentValue) => {
					return accumulator + currentValue.votes_number
				}, 0)
			)
		}

	}, [status, options])

	let voteClassName = 'vote'
	// console.log(props.enabled, !props.vote?.voted)
	if (props.enabled && !props.vote?.voted) voteClassName += ' vote-enabled'
	else voteClassName += ' vote-disabled'

	if (props.isColorChange && props.enabled) voteClassName += ' vote-white'

	const optionList = props.vote && options.map(option =>
		<RadioInput
			value={option.id}
			text={option.description}
			selected={selected}
			onChange={setSelected}
			submitted={submitted}
			setSubmitted={setSubmitted}
			enabled={props.enabled && selected}
			isActive={voteStatus}
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