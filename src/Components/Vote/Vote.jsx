import { Formik, Form, Field } from 'formik';
import React from 'react'
import './_vote.scss'

const Vote = (props) => {
	let {id, title, options} = props.vote

	const optionList = props.vote && options.map(option =>
		<label key={id + Math.random()} className='vote-group__label'>
			<Field type="radio" name={title} value={option} />
			<h6> {option} </h6>
		</label>
	)

	return (
		<div className='vote'>
			<h4 className='vote-title'>{title}</h4>
			<Formik
				initialValues={{
					title: options[0],
				}}
				onSubmit={(values) => {
					console.log(values[title]);
				}}
			>
				{() => (
					<Form>
						<div role="group" className='vote-group'>
							{optionList}
						</div>
						<button type="submit" className='btn btn-vote'>Vote</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Vote