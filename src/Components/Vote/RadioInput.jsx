import React from "react";
import "./radio.css";

const RadioInput = (props) => {
	const { selected, onChange, text, value, submitted, setSubmitted, enabled } = props;

	return (
		<div
			className="modern-radio-container"
			onClick={() => {
				if (!submitted && enabled) {
					setSubmitted(true)
					onChange(value);
				}
			}}
		>
			<div
				className={`radio-outer-circle ${value !== selected && "unselected"}`}
			>
				<div
					className={`radio-inner-mark ${value !== selected &&
						"unselected-circle"}`}
				/>
			</div>
			<div className="helper-text">{text}</div>
		</div>
	)
}

export default RadioInput