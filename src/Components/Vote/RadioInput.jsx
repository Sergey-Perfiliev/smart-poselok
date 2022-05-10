import React from "react";
import "./radio.scss";

const RadioInput = (props) => {
	const {
		selected,
		isActive,
		votedPercent,
		onChange,
		text,
		value,
		submitted,
		setSubmitted,
		enabled,
		makeVote,
		token,
		voteId
	} = props;
	console.log(props.submitted, enabled)

	return (
		<div
			className={`modern-radio-container${enabled ? " modern-radio-container--cursor-pointer" : ''}${!isActive ? " modern-radio-container--active" : ''}`}
			onClick={() => {
				if (!submitted && enabled) {
					makeVote(voteId, value, token)
					setSubmitted(true)
					onChange(value)
				}
			}}
		>
			{
				!isActive && <div className="radio-container active">
					<div className='radio-votesCount'>{votedPercent}%</div>
					<div className={`radio-outer-circle ${value === selected ? "selected" : "unselected"} active`} >
						<div className={`radio-inner-mark ${value === selected ? "selected-circle" : "unselected-circle"} active`} />
					</div>
				</div>
			}
			{
				isActive && <div className={`radio-outer-circle ${value === selected ? "selected" : "unselected"}`} >
					<div className={`radio-inner-mark ${value === selected ? "selected-circle" : "unselected-circle"}`} />
				</div>
			}
			<div style={{ width: `100%` }}>
				<div className={`helper-text${!isActive ? " helper-text--active" : ""}`}>{text}</div>
				{!isActive && <div className="result-border result-border--bottom" style={{ width: `${votedPercent}%` }}></div>}
			</div>
		</div>
	)
}

export default RadioInput