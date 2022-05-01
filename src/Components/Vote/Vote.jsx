import React, { useState } from 'react'
import RadioInput from './RadioInput';
import './_vote.scss'

const Vote = (props) => {
	let { title, options, voted } = props.vote
	const [selected, setSelected] = useState(voted || null);
	const [submitted, setSubmitted] = useState(!!voted || false)

	let voteClassName = 'vote'
	if (props.enabled) voteClassName += ' vote-enabled'
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
			enabled={props.enabled}
			key={option.id}
		/>
	)

	return (
		<div className={voteClassName}>
			<h4 className='vote-title'>{title}</h4>
			{optionList}
		</div>
	)
}

export default Vote