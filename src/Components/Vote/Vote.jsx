import React, { useState } from 'react'
import RadioInput from './RadioInput';
import './_vote.scss'

const Vote = (props) => {
	let { id, title, options } = props.vote
	const [selected, setSelected] = useState('');
	const [submitted, setSubmitted] = useState(false)

	const optionList = props.vote && options.map(option =>
		<RadioInput
			value={option}
			text={option}
			selected={selected}
			onChange={setSelected}
			submitted={submitted}
			setSubmitted={setSubmitted}
			enabled={props.enabled}
			key={id + Math.random()}
		/>
	)

	return (
		<div className={`vote ${props.isColorChange && "vote-white"}`}>
			<h4 className='vote-title'>{title}</h4>
			{optionList}
		</div>
	)
}

export default Vote